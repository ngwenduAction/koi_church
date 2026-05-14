export type IntakeField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "date" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: Array<{ label: string; value: string }>;
};

export type IntakeConfig = {
  title: string;
  description: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  fields: IntakeField[];
};

export const visitDetails = {
  title: "Visit KOI",
  eyebrow: "Weekly Sabbath Class",
  description:
    "Join the weekly Sabbath class in Johannesburg for ordered study, listening, and fellowship in Christ.",
  essentials: [
    { label: "Day", value: "Saturday" },
    { label: "Time", value: "12:00 noon" },
    { label: "City", value: "Johannesburg" },
    { label: "Teacher", value: "The teaching elder" },
    { label: "Bible reader", value: "Brothers" },
  ],
  whatToExpect: [
    "A weekly Sabbath class ordered around reading, doctrine, and careful attention to the scriptures.",
    "A gathering that is serious, reverent, and practical in tone.",
    "Fellowship after class with brothers and sisters in Christ.",
  ],
  whatToBring: ["Bible", "Pen", "Notebook", "Lunch for fellowship after class"],
  practicalNotes: [
    { label: "Parking", value: "Yes" },
    { label: "Accessibility", value: "Yes" },
    { label: "Children", value: "Yes" },
  ],
  dressCodeMen: [
    "Remove any head covering upon entering and while in the building.",
    "Do not wear sleeveless shirts, short pants, tight-fitting pants, fleece jogging pants, or other revealing pants.",
    "Younger brothers should wear belts, pull pants to the waist, tuck shirt in, and wear overall straps on the shoulders if wearing overalls.",
  ],
  dressCodeWomen: [
    "Head covering is required.",
    "Do not wear pants, shorts, skorts, mini or tight-fitting bottoms, halter tops, or revealing splits.",
    "Modest apparel only.",
  ],
  fellowshipNote:
    "After class, bring your lunch and remain for fellowship with your brothers and sisters in Christ.",
};

export const givingDetails = {
  eyebrow: "Giving",
  title: "Stewardship in seriousness and order",
  description:
    "Giving is handled plainly, with gratitude before God and without display. Use the banking details below if you wish to support the work.",
  accountHolder: "Yochanan Israel",
  bank: "FNB",
  accountNumber: "62908511745",
  branch: "250655",
};

export const membershipDetails = {
  eyebrow: "New Member Sign Up",
  title: "Membership in doctrine, conduct, and fellowship",
  description:
    "Membership joins a person to the order and doctrine of the assembly, with commitment to obedience, fellowship, and the pattern taught from the scriptures.",
  commitments: [
    "Sabbath observance",
    "Feast days",
    "Dietary law",
    "Royal commandments",
    "Judgments and statutes",
    "Doctrine according to the foundation of the apostles and prophets, with Jesus Christ as chief cornerstone",
  ],
  clarification:
    "There is no instruction period before membership unless the person is preparing for baptism based on understanding of the gospel.",
};

export const contactDetails = {
  eyebrow: "Contact",
  title: "General inquiries",
  description:
    "Use this page for practical questions, introductions, or requests for information about KOI and the weekly Sabbath class.",
  email: "kingdomofisrael1010@gmail.com",
};

export const prayerDetails = {
  eyebrow: "Prayer",
  title: "Private prayer requests",
  description:
    "Submit a prayer request carefully and plainly. This page is intended for needs that should be handled with respect, discretion, and compassion.",
  note: "Requests should be shared truthfully and with care. Private matters will be handled respectfully.",
};

export const visitRequestForm: IntakeConfig = {
  title: "Plan a visit",
  description:
    "Tell KOI a little about your intended visit so the class can receive you with order and care.",
  submitLabel: "Send visit request",
  successTitle: "Visit request prepared",
  successBody:
    "Your visit request passed validation in this phase and is ready for KOI's delivery workflow once backend wiring is connected.",
  fields: [
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      required: true,
      placeholder: "Your full name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      required: true,
      placeholder: "name@example.com",
    },
    {
      name: "phone",
      label: "Phone number",
      type: "tel",
      placeholder: "+27 ...",
    },
    {
      name: "city",
      label: "City or area",
      type: "text",
      required: true,
      placeholder: "Johannesburg",
    },
    {
      name: "firstVisit",
      label: "Is this your first visit?",
      type: "select",
      required: true,
      options: [
        { label: "Select one", value: "" },
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "attendingCount",
      label: "Number attending",
      type: "text",
      placeholder: "1",
    },
    { name: "plannedDate", label: "Planned visit date", type: "date" },
    {
      name: "notes",
      label: "Questions or access needs",
      type: "textarea",
      placeholder: "Share any practical questions or needs.",
    },
    {
      name: "venueAcknowledgment",
      label:
        "I understand that exact venue details may be confirmed after contact.",
      type: "checkbox",
      required: true,
    },
  ],
};

export const membershipForm: IntakeConfig = {
  title: "Request membership interview",
  description:
    "Use this form if you are seeking covenant fellowship with KOI and are prepared to be received on the doctrinal foundation taught here.",
  submitLabel: "Request Membership Interview",
  successTitle: "Membership request prepared",
  successBody:
    "Your membership request passed validation in this phase and is ready for KOI's interview workflow once backend wiring is connected.",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Your full name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "name@example.com",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "+27 ...",
    },
    {
      name: "city",
      label: "City/Location",
      type: "text",
      required: true,
      placeholder: "Johannesburg",
    },
    {
      name: "foundationAcknowledgment",
      label: "I confirm my commitment to the doctrinal foundation of KOI.",
      type: "checkbox",
      required: true,
    },
  ],
};

export const contactForm: IntakeConfig = {
  title: "Send an inquiry",
  description:
    "Use this form for questions, introductions, or requests for information.",
  submitLabel: "Send inquiry",
  successTitle: "Inquiry prepared",
  successBody:
    "Your inquiry passed validation in this phase and is ready for KOI's delivery workflow once backend wiring is connected.",
  fields: [
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      required: true,
      placeholder: "Your full name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      required: true,
      placeholder: "name@example.com",
    },
    {
      name: "phone",
      label: "Phone number",
      type: "tel",
      placeholder: "+27 ...",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      required: true,
      placeholder: "Reason for contact",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
      placeholder: "Write your message.",
    },
  ],
};

export const prayerForm: IntakeConfig = {
  title: "Submit a prayer request",
  description:
    "Share your request carefully. Matters submitted here should be truthful, plain, and respectful.",
  submitLabel: "Send prayer request",
  successTitle: "Prayer request prepared",
  successBody:
    "Your prayer request passed validation in this phase and is ready for KOI's care workflow once backend wiring is connected.",
  fields: [
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      required: true,
      placeholder: "Your full name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "name@example.com",
    },
    {
      name: "phone",
      label: "Phone number",
      type: "tel",
      placeholder: "+27 ...",
    },
    {
      name: "requestTitle",
      label: "Request title",
      type: "text",
      required: true,
      placeholder: "Short prayer subject",
    },
    {
      name: "requestBody",
      label: "Prayer request",
      type: "textarea",
      required: true,
      placeholder: "Write your request with care and clarity.",
    },
    {
      name: "confidentiality",
      label:
        "Please handle this request with confidentiality where appropriate.",
      type: "checkbox",
    },
  ],
};
