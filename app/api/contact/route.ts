import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, contactType } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Prepare the message for Discord webhook
    const discordMessage = {
      embeds: [
        {
          title: "🚀 New Contact Form Submission",
          color: 0x7c3aed, // Purple color
          fields: [
            {
              name: "👤 Name",
              value: name,
              inline: true,
            },
            {
              name: "📧 Email",
              value: email,
              inline: true,
            },
            {
              name: "📋 Contact Type",
              value: contactType || "General",
              inline: true,
            },
            {
              name: "📝 Subject",
              value: subject,
              inline: false,
            },
            {
              name: "💬 Message",
              value: message.length > 1000 ? message.substring(0, 1000) + "..." : message,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Builder Base Contact Form",
            icon_url: "https://builderbase.xyz/images/builder-base-logo.png",
          },
        },
      ],
    }

    // Send to Discord webhook (if configured)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discordMessage),
        })
      } catch (discordError) {
        console.error("Discord webhook error:", discordError)
        // Don't fail the entire request if Discord fails
      }
    }

    // Send email notification (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Builder Base <noreply@builderbase.xyz>",
            to: ["founder@builderbase.xyz"],
            subject: `New Contact Form: ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #7c3aed, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0;">
                  <h1 style="color: white; margin: 0; text-align: center;">🚀 New Contact Form Submission</h1>
                </div>
                
                <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7c3aed;">${email}</a></p>
                    <p><strong>Contact Type:</strong> ${contactType || "General"}</p>
                  </div>
                  
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="color: #1e293b; margin-top: 0;">Subject</h3>
                    <p style="font-weight: 600; color: #374151;">${subject}</p>
                  </div>
                  
                  <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
                    <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #7c3aed;">
                      <p style="margin: 0; line-height: 1.6; color: #374151;">${message.replace(/\n/g, "<br>")}</p>
                    </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="mailto:${email}?subject=Re: ${subject}" 
                       style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                      Reply to ${name}
                    </a>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
                  <p>This message was sent from the Builder Base contact form</p>
                  <p>Timestamp: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            `,
          }),
        })

        if (!emailResponse.ok) {
          console.error("Email sending failed:", await emailResponse.text())
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError)
        // Don't fail the entire request if email fails
      }
    }

    // Send Slack notification (if configured)
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const slackMessage = {
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🚀 New Contact Form Submission",
              },
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*Name:*\n${name}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Email:*\n${email}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Type:*\n${contactType || "General"}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Time:*\n${new Date().toLocaleString()}`,
                },
              ],
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Subject:*\n${subject}`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Message:*\n${message}`,
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "Reply via Email",
                  },
                  url: `mailto:${email}?subject=Re: ${subject}`,
                  style: "primary",
                },
              ],
            },
          ],
        }

        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(slackMessage),
        })
      } catch (slackError) {
        console.error("Slack webhook error:", slackError)
        // Don't fail the entire request if Slack fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
