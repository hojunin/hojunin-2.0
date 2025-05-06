'use server';
import { Resend } from 'resend';

interface SendEmailParams {
	from: string;
	message: string;
	name?: string;
}

export const sendEmail = async ({ from, name, message }: SendEmailParams) => {
	const resend = new Resend(process.env.RESEND_SECRET);

	const response = await resend.emails.send({
		from: 'coffee-chat@hojunin.com',
		to: 'dlsghwns12@gmail.com',
		subject: '커피챗 요청이 들어왔어요.',
		html: `<p><h1>${name}님으로부터 커피챗 요청이 들어왔어요</h1> ${message} - <strong>${from}</strong></p>`,
	});

	return response;
};
