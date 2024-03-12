'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email({ message: '이메일 형식이 달라요' }),
  message: z.string(),
});

const ContactSheet = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 'use server';
  }
  return (
    <Sheet>
      <SheetTrigger className="text-left">Coffee Chat ☕️</SheetTrigger>
      <SheetContent className="max-w-1/3">
        <SheetHeader>
          <SheetTitle>커피챗 신청하기</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC~" {...field} />
                  </FormControl>
                  <FormDescription>안적어도 좋아요</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="dlsghwns12@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메시지</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="간단한 메시지를 남겨주세요!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>메시지를 남겨주세요!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={false}>
              제출하기
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ContactSheet;
