import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact.name)
        private contactModel: mongoose.Model<Contact>
    ){}

    async findAll(query: Query, user: User) {
        const contactsPerPage = 3;
        const currentPage = Number(query.page) || 1;
        const skip = contactsPerPage * (currentPage - 1);
    
        const keyword = query.keyword
            ? {
                  name: {
                      $regex: query.keyword,
                      $options: 'i',
                  },
              }
            : {};
    
        const filter = { ...keyword, user: user._id };
    
        const contacts = await this.contactModel
            .find(filter)
            .limit(contactsPerPage)
            .skip(skip);
    
        return contacts;
    }

    async create(contact: Contact, user: User):Promise<Contact>{
        const data = Object.assign(contact, {user: user._id})
        const res = await this.contactModel.create(contact)
        return res
    }

    async findById(id: string,user: User):Promise<Contact>{
        
        const isValidId = mongoose.isValidObjectId(id)

        if(!isValidId){
            throw new BadRequestException("Provide correct contact id.")
        }

        const contact = await this.contactModel.findById(id)
        if(!contact){
            throw new NotFoundException("Contact not found.")
        }

        if (contact.user.toString() !== user._id.toString()) {
            throw new BadRequestException("You are not authorized to update this contact.");
        }

        return contact
    }

    async updateById(id: string, contact: Contact, user: User): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
        throw new BadRequestException("Provide correct contact id.");
    }

    const existingContact = await this.contactModel.findById(id);
    if (!existingContact) {
        throw new NotFoundException("Contact not found.");
    }

    if (existingContact.user.toString() !== user._id.toString()) {
        throw new BadRequestException("You are not authorized to update this contact.");
    }

    return await this.contactModel.findByIdAndUpdate(id, contact, {
        new: true,
        runValidators: true,
    });
}

async deleteById(id: string, user: User): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
        throw new BadRequestException("Provide correct contact id.");
    }

    const contact = await this.contactModel.findById(id);
    if (!contact) {
        throw new NotFoundException("Contact not found.");
    }

    if (contact.user.toString() !== user._id.toString()) {
        throw new BadRequestException("You are not authorized to delete this contact.");
    }

    return await this.contactModel.findByIdAndDelete(id);
}

}
