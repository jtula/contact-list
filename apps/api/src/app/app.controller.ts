import { IContact } from '@contact-list/api-interfaces';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { GetContactsFilterDto } from './dto/get-contacts-filter.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class AppController {
  constructor(private readonly contactService: AppService) {}

  @Get()
  async getContacts(@Query() filterDto: GetContactsFilterDto, @Res() response) : Promise<IContact[]> {
    try {
      let contacts = []
      if(Object.keys(filterDto).length) {
        contacts = await this.contactService.getContactsWithFilters(filterDto)
      } else {
        contacts = await this.contactService.getAllContacts();
      }
      return response.status(HttpStatus.OK).json(contacts);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('filter')
  async filterContacts(@Query() query, @Res() response): Promise<IContact[]> {
    try {
      const contacts = await this.contactService.filterContacts(query);
      return response.status(HttpStatus.OK).json(contacts);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getContact(@Res() response, @Param('id') contactId: string): Promise<IContact> {
    try {
        const existingContact = await
        this.contactService.getContact(contactId);
        return response.status(HttpStatus.OK).json({
          message: 'Contact found successfully', existingContact
        });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  updateContact(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.updateContact(id, updateContactDto);
  }

  @Post()
  async createContact(@Res() response, @Body() createContactDto: CreateContactDto) {
    try {
      const newContact = await this.contactService.createContact(createContactDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Contact has been created successfully',
        newContact
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Contact not created!',
        error: 'Bad Request'
      });
    }
  }

  @Delete('/:id')
  async deleteContact(@Res() response, @Param('id') contactId: string) {
    try {
      const deletedContact = await this.contactService.deleteContact(contactId);
      return response.status(HttpStatus.OK).json({
        message: 'Contact deleted successfully',
        deletedContact
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
