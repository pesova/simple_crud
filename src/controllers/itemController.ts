import { Request, Response } from 'express';

import { ItemService } from '@src/services/itemService';

const itemService = new ItemService();

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id as string;

    const items = await itemService.getUserItems(userId);

    res.status(200).json({
      success: true,
      message: 'items fetched successfully',
      data: items,
    });
  } catch (error) {
    throw error;
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id as string;
    const itemId = req.params.id as string;

    const item = await itemService.getItemById(itemId, userId);

    if (!item) {
      res.status(404).json({
        success: false,
        message: 'Item not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'item retrieved successfully',
      data: item,
    });
  } catch (error) {
    throw error;
  }
};

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id as string;

    const { name, description, price, quantity } = req.body;

    const item = await itemService.createItem(
      { name, description, price, quantity },
      userId,
    );

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item,
    });
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id as string;
    const itemId = req.params.id as string;
    const updates = req.body;
    const updatedItem = await itemService.updateItem(itemId, updates, userId);

    if (!updatedItem) {
      res.status(404).json({
        success: false,
        message: 'Item not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id as string;
    const itemId = req.params.id as string;

    const deleted = await itemService.deleteItem(itemId, userId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Item not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    throw error;
  }
};
