import type { LoaderArgs } from "@remix-run/cloudflare";
import invariant from "tiny-invariant";
import { config } from "~/config";

const URL = "https://api.sendgrid.com";

type Error_400 = {
  message: string;
  field: string;
  error_id: string;
  parameter: string;
};

type Error = {
  message: string;
  field: string | null;
  help: any;
};
type Error_500 = {
  message: string;
};

type AddEmailResponse =
  | {
      job_id: string;
      errors: undefined;
    }
  | {
      errors: Error_400[];
    }
  | {
      id: string;
      errors: Error[];
    }
  | {
      errors: Error_500[];
    };

export const createSendGridSdk = (context: LoaderArgs["context"]) => {
  invariant(
    typeof context.SENDGRID_API_KEY === "string",
    "SENDGRID_API_KEY is not set"
  );
  const SENDGRID_API_KEY = context.SENDGRID_API_KEY;

  const addEmail = async (email: string) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    });
    const body = JSON.stringify({
      contacts: [{ email }],
    });
    const response = await fetch(`${URL}/v3/marketing/contacts`, {
      method: "PUT",
      headers,
      body,
    });
    const data = await response.json<AddEmailResponse>();
    return {
      ...data,
      status: response.status,
    };
  };

  type MessageData = {
    email: string;
    message: string;
    firstName?: string;
    lastName?: string;
  };

  const sendEmail = async (messageData: MessageData) => {
    const body = JSON.stringify({
      from: {
        email: config.email,
        name: "Instrumente Creative",
      },
      personalizations: [
        {
          to: [
            {
              email: config.email,
            },
          ],
        },
      ],
      subject: "Mesaj nou de pe site",
      content: [
        {
          type: "text/plain",
          value: `Nume: ${messageData.firstName} ${messageData.lastName}
                  Email: ${messageData.email}
                  Mesaj: ${messageData.message}`,
        },
      ],
    });

    const response = await fetch(`${URL}/v3/mail/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body,
    });

    return response;
  };

  return { addEmail, sendEmail };
};
