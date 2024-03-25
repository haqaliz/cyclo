import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./_globals";
import { sendMail } from '$resend';

interface ContactContext {
    name: string;
    email: string;
    subject: string;
    message: string;
};
export const contact = async (context: ContactContext) => {
    const ref = doc(collection(db, 'support'));
    await setDoc(ref, {
        ...context,
        created_at: new Date(),
    });
    await sendMail(
        context.email,
        'Your Inquiry Submission',
        'hello world',
    );
};

export default {
    contact,
};