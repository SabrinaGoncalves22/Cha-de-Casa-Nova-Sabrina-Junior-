import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "sabrina2003goncalves@gmail.com";

export async function POST(request: Request) {
  const { nome, recado } = await request.json();

  try {
    await resend.emails.send({
      from: "Chá de Casa Nova <onboarding@resend.dev>",
      to: [TO],
      subject: `${nome} confirmou presença`,
      text: `Nome: ${nome}\nRecado: ${recado || "-"}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
