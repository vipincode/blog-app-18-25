import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import BlogPost, { IBlogPost } from '../models/blog-post.model';
import { blogPostSchema, BlogPostInput } from '../validations/blog-post.valiadtion';
import { AppError } from '../utils/errors';

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const posts: IBlogPost[] = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    if (error instanceof ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else {
      next(new AppError('Error fetching posts', 500));
    }
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validatedData: BlogPostInput = blogPostSchema.parse(req.body);
    const newPost: IBlogPost = new BlogPost(validatedData);
    const savedPost: IBlogPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error instanceof ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else {
      next(new AppError('Error creating post', 500));
    }
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const post: IBlogPost | null = await BlogPost.findById(req.params.id);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Error fetching post', 500));
    }
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validatedData: BlogPostInput = blogPostSchema.parse(req.body);
    const updatedPost: IBlogPost | null = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );
    if (!updatedPost) {
      throw new AppError('Post not found', 404);
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof ZodError) {
      next(new AppError(error.errors[0].message, 400));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Error updating post', 500));
    }
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const deletedPost: IBlogPost | null = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      throw new AppError('Post not found', 404);
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Error deleting post', 500));
    }
  }
};
