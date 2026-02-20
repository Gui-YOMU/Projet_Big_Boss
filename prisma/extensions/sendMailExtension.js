import { Prisma } from "../../generated/prisma/client.js";
import { transporter } from "../../src/transporter.js";

export const sendMailExtension = Prisma.defineExtension({
  name: "sendMail",
  query: {
    employee: {
      create: async ({ args, query }) => {
        try {
          const mail = await transporter.sendMail({
            from: `"GestioCare" <${process.env.SMTP_USER}>`,
            to: `"${args.data.mail}"`,
            subject: `Compte employé créé dans GestioCare.`,
            text: `Bonjour ${args.data.firstName} ${args.data.lastName}.\n\nVotre établissement vient de vous créer un compte sur GestioCare.\n\nVos identifiants sont les suivants :\n-Votre mail\n-Votre mot de passe temporaire : ${args.data.password}\n\nNous vous invitons à cliquer sur le lien suivant pour modifier votre mot de passe : "http://localhost:3000/employees/reset".\n\nÀ très vite sur GestioCare !`
          });
          console.log("Mail envoyé", mail.messageId);
          return query(args);
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  },
});
