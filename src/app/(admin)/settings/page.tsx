import React from 'react';
import { getUserForms } from "@/app/actions/getUserForms";
import FormsPicker from "../results/FormsPicker";
import GeneralSettings from "./GeneralSettings";
import FormSettings from "./FormSettings";

const SettingsPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const userForms = await getUserForms();

  if (!userForms?.length) {
    return <div>No forms found</div>;
  }

  const selectOptions = userForms.map((form) => ({
    label: form.name,
    value: form.id,
  }));

  const formId = searchParams?.formId 
    ? parseInt(searchParams.formId as string) 
    : userForms[0].id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <GeneralSettings />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Form Settings</h2>
        <FormsPicker options={selectOptions} />
        <FormSettings formId={formId} />
      </div>
    </div>
  );
};

export default SettingsPage;
