import Item from '../models/Item';
import mongoose from 'mongoose';

export class ItemService {
  async createItem(data: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }, userId: string) {
    const item = await Item.create({
      ...data,
      createdBy: userId as any,
    });
    return item;
  }

  async getUserItems(userId: string) {
    return await Item.find({
      createdBy: userId as any,
    }).sort({ createdAt: -1 });
  }

  async getItemById(itemId: string, userId: string) {
    return await Item.findOne({
      _id: new mongoose.Types.ObjectId(itemId),
      createdBy: userId as any,
    });
  }

  async updateItem(itemId: string, updates: any, userId: string) {
    return await Item.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(itemId),
        createdBy: userId as any,
      },
      updates,
      { new: true, runValidators: true }
    );
  }

  async deleteItem(itemId: string, userId: string) {
    const result = await Item.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(itemId),
      createdBy: userId as any,
    });
    return !!result;
  }
}