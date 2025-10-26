import nodemailer from 'nodemailer';
import type { SendMessageRequest } from '../../app/utils/types/interfaces';


function spacing(amount: number): string {
  const SPACING_BASE = 8;

  return `${SPACING_BASE * amount}px`;
}

const colors = {
  primary: '#694F35',
  secondary: '#FBF7F2',
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Get the request body
  const body = await readBody(event) as SendMessageRequest
  
  // Validate required fields
  if (!body.authorName || !body.email || !body.text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: Number(config.emailPort),
    secure: config.emailSecure, // true for 465, false for other ports
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  })

  // Email content
  const emailContent = `
    <div style="padding: ${spacing(2)} ${spacing(4)}; background-color: ${colors.secondary};  box-shadow: 5px 8px 33px -23px ${colors.primary}; width: min(100%, 760px); border-radius: ${spacing(2)};">
      <h1 style="color: ${colors.primary}; font-size: ${spacing(4)}; font-weight: 700; margin: 0 auto ${spacing(2)}; text-align: center; padding-bottom: ${spacing(2)}; border-bottom: 2px solid ${colors.primary}; width: fit-content;">Qualis</h1>
      <h2>Nowa wiadomość z formularza kontaktowego</h2>
      
      <h3 style="color:${colors.primary};">Dane kontaktowe:</h3>
      <p><strong>Imię i nazwisko:</strong> ${body.authorName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Miejscowość:</strong> ${body.city}</p>
      ${body.phoneNumber ? `<p><strong>Telefon:</strong> ${body.phoneNumber}</p>` : ''}
      ${body.website ? `<p><strong>Strona internetowa:</strong> ${body.website}</p>` : ''}
      
      <h3 style="color:${colors.primary};">Szczegóły projektu:</h3>
      <p>${body.text.replace(/\n/g, '<br>')}</p>
      
      <p><strong>Przedział cenowy:</strong> ${body.minPrice} - ${body.maxPrice} zł</p>
      
      ${body.images && body.images.length > 0 ? `
      <h3 style="color:${colors.primary};">Załączone obrazy:</h3>
      <p>Liczba obrazów: ${body.images.length}</p>
      ` : ''}
      
      <p><em>Wiadomość wysłana przez formularz kontaktowy</em></p>
    </div>
  `

  try {
    // Send email
    const info = await transporter.sendMail({
      from: `"Formularz kontaktowy" <${config.emailUser}>`,
      to: config.emailTo,
      subject: `Nowa wiadomość od ${body.authorName} - ${body.city}`,
      html: emailContent,
      attachments: body.images?.map((image, index) => ({
        filename: image.name || `attachment-${index + 1}.${image.name?.split('.').pop() || 'jpg'}`,
        content: image.content,
        encoding: 'base64'
      })) || []
    })

    return {
      success: true,
      messageId: info.messageId
    }
  } catch (error) {
    console.error('Email sending failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email'
    })
  }
})
