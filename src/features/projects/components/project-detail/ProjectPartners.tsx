import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Mail, MoreVertical, Phone, PhoneCall, Plus, Trash2, Users } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Local mock partners for this project detail page
const projectPartners = [
  {
    id: 1,
    name: "ABC Construction Co.",
    email: "info@abcconstruction.com",
    phone: "+91 98765 43211",
    role: "Civil Works Partner",
    share: 40,
  },
  {
    id: 2,
    name: "Skyline Infra JV",
    email: "team@skylineinfra.com",
    phone: "+91 98765 43001",
    role: "JV Partner",
    share: 55,
  },
  {
    id: 3,
    name: "Greenfield Associates",
    email: "hello@greenfield.com",
    phone: "+91 98765 43999",
    role: "Landscape & External",
    share: 30,
  },
];

// Mock contacts store function since we don't have the file
const getContactsByProject = (id: string) => {
  return [
    { id: 1, name: "John Doe", phone: "+91 9876543210", description: "Site Supervisor" },
    { id: 2, name: "Jane Smith", phone: "+91 9876543211", description: "Architect" }
  ]
}

export function ProjectPartners() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id;

  const contacts = useMemo(() => {
    if (!projectId) return [];
    return getContactsByProject(projectId);
  }, [projectId]);

  return (
    <Accordion
      type="multiple"
      defaultValue={["partners", "contacts"]}
      className="w-full space-y-4"
    >
      {/* Partner Management */}
      <AccordionItem value="partners" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Partner Management</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">Partners linked to this project</p>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => navigate("/add-partner")}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add partner
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-border/60 p-3 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Avatar className="h-9 w-9 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {partner.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm truncate">
                        {partner.name}
                      </p>
                      <Badge variant="secondary" className="text-[10px] px-2 py-0 h-5 font-normal">
                        Partner
                      </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground mb-2 truncate">
                      {partner.role}
                    </p>

                    <div className="space-y-1 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">
                          {partner.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{partner.phone}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-full bg-background">
                        {partner.share}% share
                      </Badge>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/partner/${partner.id}`)
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Contacts per project */}
      <AccordionItem value="contacts" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Project Contacts</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-4 pt-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">
              Important contacts linked to this project
            </p>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => projectId && navigate(`/project/${projectId}/contacts`)}
              disabled={!projectId}
            >
              <Plus className="h-3 w-3 mr-1" />
              Manage
            </Button>
          </div>

          {(!contacts || contacts.length === 0) ? (
            <div className="mx-1 mt-1 text-xs text-muted-foreground border border-dashed rounded-lg px-3 py-6 flex flex-col items-center justify-center gap-2 text-center">
              <PhoneCall className="h-8 w-8 text-muted-foreground/50" />
              <span>No contacts added yet. Use "Manage" to add key people for this project.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/60 p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm truncate">
                          {c.name}
                        </p>
                      </div>

                      {c.description && (
                        <p className="text-[11px] text-muted-foreground mb-1 truncate">
                          {c.description}
                        </p>
                      )}

                      {c.phone && (
                        <div className="space-y-1 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{c.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground"
                    onClick={() => projectId && navigate(`/project/${projectId}/contacts`)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
