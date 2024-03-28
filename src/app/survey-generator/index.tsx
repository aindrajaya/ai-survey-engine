"use client";
import React, { useState } from "react";

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

type Props = {};

const SurveyGenerator = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onFormCreate = () => {
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button onClick={onFormCreate}>Create Survey</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Survey</DialogTitle>
          <form>
            <div className="grid gap-4 py-4">
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Share what your servey is about, who is for, and what information you would like to collect. And AI will do the magic"
              />
            </div>
          </form>
        </DialogHeader>
        <DialogFooter>
          <Button variant="link">Create Manually</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyGenerator;
