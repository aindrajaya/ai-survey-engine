import { InferSelectModel } from "drizzle-orm";
import { forms, questions, fieldOptions } from "@/db/schema";

export type FormSelectModel = InferSelectModel<typeof forms>;
export type QueastionSelectModel = InferSelectModel<typeof questions>;
export type FieldOptionsSelectModel = InferSelectModel<typeof fieldOptions>;
