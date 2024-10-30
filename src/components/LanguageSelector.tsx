import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe2 } from "lucide-react";
import { languages } from "@/data/languages";

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function LanguageSelector({ value, onValueChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <Globe2 className="h-5 w-5 text-gray-500" />
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a language">
            {languages.find(lang => lang.code === value)?.flag} {languages.find(lang => lang.code === value)?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                {lang.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}