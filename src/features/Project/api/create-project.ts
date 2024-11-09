import { api } from "@/lib/api-client";
import { nanoid } from "nanoid";
import { Project } from "../context/project-context";

export const useCreateProject = (data: Project): Promise<Project> => {
    const id = "pj-" + nanoid();
    const newProjectWithId = { ...data, id };
    return api.post("projects", newProjectWithId);
}
