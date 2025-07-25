
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail } from "lucide-react";

interface InviteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, firstName: string, lastName: string) => void;
}

export const InviteEmployeeModal = ({ isOpen, onClose, onInvite }: InviteEmployeeModalProps) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [touched, setTouched] = useState({ email: false, firstName: false, lastName: false });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value) || value === "");
  };

  const reset = () => {
    setEmail("");
    setIsValidEmail(true);
    setFirstName("");
    setLastName("");
    setTouched({ email: false, firstName: false, lastName: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, firstName: true, lastName: true });
    if (email && validateEmail(email) && firstName && lastName) {
      onInvite(email, firstName, lastName);
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const emailHasError = touched.email && (!email || !isValidEmail);
  const firstNameHasError = touched.firstName && !firstName;
  const lastNameHasError = touched.lastName && !lastName;

  const canInvite = email && isValidEmail && firstName && lastName;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-blue-900 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Invite Employee to Tasklane
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            Send an invitation to join the Tasklane platform. The employee will be added to your organization.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-blue-800">
              First Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="firstName"
              value={firstName}
              placeholder="Enter first name"
              onChange={e => setFirstName(e.target.value)}
              className={`border-blue-200 focus:border-blue-400 ${firstNameHasError ? 'border-red-400 focus:border-red-400' : ''}`}
              required
              onBlur={() => setTouched(t => ({ ...t, firstName: true }))}
            />
            {firstNameHasError && (
              <p className="text-sm text-red-600">First name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-blue-800">
              Last Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="lastName"
              value={lastName}
              placeholder="Enter last name"
              onChange={e => setLastName(e.target.value)}
              className={`border-blue-200 focus:border-blue-400 ${lastNameHasError ? 'border-red-400 focus:border-red-400' : ''}`}
              required
              onBlur={() => setTouched(t => ({ ...t, lastName: true }))}
            />
            {lastNameHasError && (
              <p className="text-sm text-red-600">Last name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-800">
              Email Address <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="employee@company.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              className={`border-blue-200 focus:border-blue-400 ${
                emailHasError ? 'border-red-400 focus:border-red-400' : ''
              }`}
              required
            />
            {emailHasError && (
              <p className="text-sm text-red-600">Please enter a valid email address</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!canInvite}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Invite Employee to Tasklane
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
