const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports.mailer = async (user, newPassword) => {
    const transporter = nodemailer.createTransport({
        host: process.env.smtp_host,
        port: 587,
        secure: false,
        auth: {
            user: process.env.smtp_user,
            pass: process.env.smtp_password
        }
    });

    let options = {
        from: '"WhatToCook" <noreply@whattocook.bysimeit.be>',
        to: user,
        subject: "Sécurité - Réinitialisation du mot de passe",
        html: `
        <html>
        <head>
            <style type="text/css" rel="stylesheet" media="all">
            
            @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
            body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
            }
            
            .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            }
            
            body,
            td,
            th {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
            }
            
            h1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            }
            
            p,
            ul,
            ol,
            blockquote {
            margin: .4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
            }
            
            .button {
            background-color: #3869D4;
            border-top: 10px solid #3869D4;
            border-right: 18px solid #3869D4;
            border-bottom: 10px solid #3869D4;
            border-left: 18px solid #3869D4;
            display: inline-block;
            color: #FFF;
            text-decoration: none;
            border-radius: 3px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
            }
            
            .button--green {
            background-color: #22BC66;
            border-top: 10px solid #22BC66;
            border-right: 18px solid #22BC66;
            border-bottom: 10px solid #22BC66;
            border-left: 18px solid #22BC66;
            }
            
            body {
            background-color: #F2F4F6;
            color: #51545E;
            }
            
            .email-masthead {
            padding: 25px 0;
            text-align: center;
            }
            
            .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #FFFFFF;
            }
            
            .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
            }
            
            .content-cell {
            padding: 45px;
            }    
            </style>
            </head>
            <body>
                <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="center">
                    <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                        <td class="email-masthead">
                            WhatToCook
                        </td>
                        </tr>
                        <tr>
                        <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td class="content-cell">
                                <div class="f-fallback">
                                    <h1>Bonjour,</h1>
                                    <p>Vous avez récemment fait une demande pour réinitialiser votre mot de passe à votre compte WhatToCook. <strong>Ce mot de passe est valable immédiatement jusqu'à ce que vous l'ayez changé.</strong></p>
                                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td align="center">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                            <tr>
                                            <td align="center">
                                                <p href="{{action_url}}" class="f-fallback button button--green" target="_blank">Mot de passe : <strong>${newPassword}</strong></p>
                                            </td>
                                            </tr>
                                        </table>
                                        </td>
                                    </tr>
                                    </table>
                                    <p>Si vous n'avez pas fait cette demande, ignorez cet eMail ou contactez le support si vous avez n'importe quelle question.</p>
                                    <p>Bien à vous,
                                    <br>L'équipe WhatToCook</p>
                                </div>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </body>
        </html>`
    };

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent : " + info.response);
    })

    //console.log("Message sent: %s", info.messageId);
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}