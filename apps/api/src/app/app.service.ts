import { Injectable, NotFoundException  } from '@nestjs/common';
import { IContact } from '@contact-list/api-interfaces';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { GetContactsFilterDto } from './dto/get-contacts-filter.dto';

@Injectable()
export class AppService {

  constructor(@InjectModel('Contact') private contactModel:Model<IContact>) { }

  async createContact(createContactDto: CreateContactDto): Promise<IContact> {
    const newContact = await new this.contactModel(createContactDto);
    return newContact.save();
  }

  async getContactsWithFilters(filterDto: GetContactsFilterDto) : Promise<IContact[]> {
    //  todo: filter other parameters
    const { search } = filterDto;
    let contacts = await this.getAllContacts()

    if(search) {
      contacts = contacts.filter(contact => contact.name.includes(search) || 
        contact.address.includes(search) || contact.phone.includes(search) || 
        contact.email.includes(search))
    }
    return contacts
  }

  async filterContacts(query): Promise<IContact[]> {
      const results = await this.contactModel.find(query)
      return results
  }

  async updateContact(contactId: string, updateContactDto: UpdateContactDto): Promise<IContact> {
    const existingContact = await this.contactModel.findByIdAndUpdate(contactId, updateContactDto, { new: true });

    if (!existingContact) {
      throw new NotFoundException(`Contact #${contactId} not found`);
    }

    return existingContact;
  }

  async getAllContacts(): Promise<IContact[]> {
    const contactData = await this.contactModel.find();

    if (!contactData || contactData.length == 0) {
      throw new NotFoundException('Contacts not found!');
    }

    return contactData;
  }

  async getContact(contactId: string): Promise<IContact> {
    const existingContact  = await this.contactModel.findById(contactId).exec();

    if (!existingContact ) {
      throw new NotFoundException(`Contact #${contactId} not found`);
    }

    return existingContact ;
  }

  async deleteContact(contactId: string): Promise<IContact> {
    const deletedContact = await this.contactModel.findByIdAndDelete(contactId);

    if (!deletedContact) {
      throw new NotFoundException(`Contact #${contactId} not found`);
    }

    return deletedContact;
  }
}
