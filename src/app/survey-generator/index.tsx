"use client";
import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { generateSurveyForm } from "@/actions/generateSurveyForm";
import { useFormState, useFormStatus } from "react-dom";

import { useSession, signIn } from "next-auth/react";
import { navigate } from "../actions/navigateToForm";

type Props = {};

const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
}

const SurveyGenerator = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [state, formAction] = useFormState(generateSurveyForm, initialState);
  const session = useSession();

  useEffect(() => {
    if (state.message === "success") {
      setDialogOpen(false);
      navigate(state.data.formId);
    }

    // console.log(state);
  }, [state.message]);

  const onFormCreate = () => {
    if (session.data?.user) {
      setDialogOpen(true);
    } else {
      signIn();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button onClick={onFormCreate}>Create Survey</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Survey</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Share what your servey is about, who is for, and what information you would like to collect. And AI will do the magic"
            />
          </div>

          <DialogFooter>
            <SubmitButton />
            <Button variant="link">Create Manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyGenerator;
