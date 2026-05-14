import { membershipForm } from "../../../content/institutional";
import { IntakeForm } from "./IntakeForm";

export function MembershipForm() {
  return <IntakeForm config={membershipForm} tone="study" />;
}
