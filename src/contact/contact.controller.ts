import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './schemas/contact.schema';
import { UpdateContactDto } from './dto/update_contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService){}

    @Get()
    @UseGuards(AuthGuard())
    async getAllContacts(
        @Query() query: ExpressQuery,
        @Req() req
    ): Promise<Contact[]> {
        return this.contactService.findAll(query,req.user)
    }

    @Post('new')
    @UseGuards(AuthGuard())
    async createContact(
        @Body()
        contact : CreateContactDto,
        @Req() req
    ): Promise<Contact> {
        return this.contactService.create(contact,req.user)
    }

    @Get(":id")
    async getContactById(
        @Param('id')
        id: string,
        @Req() req
    ): Promise<Contact> {
        return this.contactService.findById(id,req.user)
    }

    @Put(":id")
    @UseGuards(AuthGuard())
    async updateContact(
        @Param('id') id: string,
        @Body() contact: UpdateContactDto,
        @Req() req
    ): Promise<Contact> {
        return this.contactService.updateById(id, contact, req.user);
    }
    
    @Delete(":id")
    @UseGuards(AuthGuard())
    async deleteContact(
        @Param('id') id: string,
        @Req() req
    ): Promise<Contact> {
        return this.contactService.deleteById(id, req.user);
    }

}
