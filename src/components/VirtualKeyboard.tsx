import { Button } from "@/components/ui/button";
import { keyboards, getDefaultLayout } from "@/data/keyboards";
import { languages } from "@/data/languages";
import { translations } from "@/data/translations";
import { cn } from "@/lib/utils";

interface VirtualKeyboardProps {
  language: string;
  onKeyClick: (key: string) => void;
  onBackspace: () => void;
  onSpecialKey: (key: string) => void;
  shiftPressed: boolean;
  isPhonetic: boolean;
}

export function VirtualKeyboard({ 
  language, 
  onKeyClick, 
  onBackspace,
  onSpecialKey,
  shiftPressed,
  isPhonetic
}: VirtualKeyboardProps) {
  const currentLang = languages.find(lang => lang.code === language);
  const isRTL = currentLang?.dir === 'rtl';
  const t = translations[language as keyof typeof translations]?.keyboard || translations.en.keyboard;
  
  let layoutKey = language;
  if (language === 'ur' && isPhonetic) {
    layoutKey = shiftPressed ? 'ur_phonetic_shift' : 'ur_phonetic';
  } else if (shiftPressed) {
    layoutKey = `${language}_shift`;
  }

  const currentKeyboard = keyboards[layoutKey as keyof typeof keyboards] || 
                         keyboards[language as keyof typeof keyboards] || 
                         getDefaultLayout();

  const specialKeys = [
    { key: 'Tab', width: 'w-16' },
    { key: 'CapsLock', width: 'w-20' },
    { key: 'Shift', width: 'w-24' },
    { key: 'Ctrl', width: 'w-16' },
    { key: 'Alt', width: 'w-16' },
    { key: 'Home', width: 'w-16' },
    { key: 'End', width: 'w-16' },
  ];

  return (
    <div className="space-y-2 bg-background p-4 max-w-4xl mx-auto">
      {/* Main keyboard layout */}
      <div className="space-y-1">
        {/* Numbers row */}
        <div 
          className="flex justify-center gap-1"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {currentKeyboard[0].map((key) => (
            <Button
              key={key}
              onClick={() => onKeyClick(key)}
              variant="outline"
              className="h-12 w-12 text-lg"
            >
              {key}
            </Button>
          ))}
          <Button
            onClick={onBackspace}
            variant="outline"
            className="h-12 w-20 text-sm font-medium"
          >
            {t.backspace}
          </Button>
        </div>

        {/* Tab + QWERTY row */}
        <div className="flex justify-center gap-1">
          <Button
            onClick={() => onSpecialKey('Tab')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.tab}
          </Button>
          <div className="flex gap-1">
            {currentKeyboard[1].map((key) => (
              <Button
                key={key}
                onClick={() => onKeyClick(key)}
                variant="outline"
                className="h-12 w-12 text-lg"
              >
                {key}
              </Button>
            ))}
          </div>
        </div>

        {/* CapsLock + ASDF row */}
        <div className="flex justify-center gap-1">
          <Button
            onClick={() => onSpecialKey('CapsLock')}
            variant="outline"
            className="h-12 w-20 text-sm font-medium"
          >
            {t.capsLock}
          </Button>
          <div className="flex gap-1">
            {currentKeyboard[2].map((key) => (
              <Button
                key={key}
                onClick={() => onKeyClick(key)}
                variant="outline"
                className="h-12 w-12 text-lg"
              >
                {key}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => onSpecialKey('Enter')}
            variant="outline"
            className="h-12 w-20 text-sm font-medium"
          >
            {t.enter}
          </Button>
        </div>

        {/* Shift + ZXCV row */}
        <div className="flex justify-center gap-1">
          <Button
            onClick={() => onSpecialKey('Shift')}
            variant={shiftPressed ? "secondary" : "outline"}
            className="h-12 w-24 text-sm font-medium"
          >
            {t.shift}
          </Button>
          <div className="flex gap-1">
            {currentKeyboard[3].map((key) => (
              <Button
                key={key}
                onClick={() => onKeyClick(key)}
                variant="outline"
                className="h-12 w-12 text-lg"
              >
                {key}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => onSpecialKey('Shift')}
            variant={shiftPressed ? "secondary" : "outline"}
            className="h-12 w-24 text-sm font-medium"
          >
            {t.shift}
          </Button>
        </div>

        {/* Bottom row with Ctrl, Alt, Space */}
        <div className="flex justify-center gap-1">
          <Button
            onClick={() => onSpecialKey('Ctrl')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.ctrl}
          </Button>
          <Button
            onClick={() => onSpecialKey('Alt')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.alt}
          </Button>
          <Button
            onClick={() => onKeyClick(' ')}
            variant="outline"
            className="h-12 flex-1 max-w-[400px] text-sm font-medium"
          >
            {t.space}
          </Button>
          <Button
            onClick={() => onSpecialKey('Alt')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.alt}
          </Button>
          <Button
            onClick={() => onSpecialKey('Ctrl')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.ctrl}
          </Button>
          <Button
            onClick={() => onSpecialKey('Home')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.home}
          </Button>
          <Button
            onClick={() => onSpecialKey('End')}
            variant="outline"
            className="h-12 w-16 text-sm font-medium"
          >
            {t.end}
          </Button>
        </div>
      </div>
    </div>
  );
}