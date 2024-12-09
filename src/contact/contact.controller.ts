import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './schemas/contact.schema';
import { UpdateContactDto } from './dto/update_contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService){}

    @Get()
    async getAllContacts(
        @Query() query: ExpressQuery
    ): Promise<Contact[]> {
        return this.contactService.findAll(query)
    }

    @Post('new')
    async createContact(
        @Body()
        contact : CreateContactDto
    ): Promise<Contact> {
        return this.contactService.create(contact)
    }

    @Get(":id")
    async getContactById(
        @Param('id')
        id: string
    ): Promise<Contact> {
        return this.contactService.findById(id)
    }

    @Put(":id")
    async updateContact(
        @Param('id')
        id: string,
        @Body()
        contact:UpdateContactDto
    ): Promise<Contact> {
        return this.contactService.updateById(id,contact)
    }

    @Delete(":id")
    async deleteContact(
        @Param('id')
        id: string,
    ): Promise<Contact> {
        return this.contactService.deleteById(id)
    }


    
}
