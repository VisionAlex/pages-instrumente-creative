const URL = "https://api.sendgrid.com";
const SENDGRID_API_KEY =
  "***REMOVED***";

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

export default { addEmail };