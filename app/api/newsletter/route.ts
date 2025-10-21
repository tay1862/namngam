import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: เชื่อมต่อกับ Email Service
    // Option 1: Resend API
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'NAMNGAM <onboarding@resend.dev>',
    //   to: email,
    //   subject: 'ຂອບໃຈທີ່ສະໝັກ Newsletter',
    //   html: '<h1>ຍິນດີຕ້ອນຮັບ!</h1>',
    // });

    // Option 2: Mailchimp API
    // const response = await fetch('https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed',
    //   }),
    // });

    // Option 3: Save to Database
    // await db.subscribers.create({ email, createdAt: new Date() });

    // ตอนนี้แค่ log ไว้ก่อน (ลูกค้าเลือก service แล้วค่อยเชื่อม)
    console.log('Newsletter subscription:', email);

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
