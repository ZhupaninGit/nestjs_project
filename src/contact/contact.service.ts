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

    async findAll(query : Query){

        const contactsPerPage = 3
        const currentPage = Number(query.page) || 1
        const skip = contactsPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            name : {
                $regex: query.keyword,
                $options: "i"
            }
        } : {}
        const contacts = await this.contactModel.find({...keyword}).limit(contactsPerPage).skip(skip)
        return contacts
    }

    async create(contact: Contact, user: User):Promise<Contact>{
        const data = Object.assign(contact, {user: user._id})
        const res = await this.contactModel.create(contact)
        return res
    }

    async findById(id: string):Promise<Contact>{
        
        const isValidId = mongoose.isValidObjectId(id)

        if(!isValidId){
            throw new BadRequestException("Provide correct contact id.")
        }

        const contact = await this.contactModel.findById(id)
        if(!contact){
            throw new NotFoundException("Contact not found.")
        }
        return contact
    }

    async updateById(id: string,contact: Contact):Promise<Contact>{
        const isValidId = mongoose.isValidObjectId(id)

        if(!isValidId){
            throw new BadRequestException("Provide correct contact id.")
        }

        return await this.contactModel.findByIdAndUpdate(id,contact,{
            new: true,
            runValidators: true
        })
    }

    async deleteById(id: String):Promise<Contact>{

        const isValidId = mongoose.isValidObjectId(id)

        if(!isValidId){
            throw new BadRequestException("Provide correct contact id.")
        }
        
        return await this.contactModel.findByIdAndDelete(id)
    }
}
