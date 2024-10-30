import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Keyboard, Copy, FileDown, Undo2, Redo2, Trash2, Scissors } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VirtualKeyboard } from "@/components/VirtualKeyboard";
import { languages } from "@/data/languages";
import { Button } from "@/components/ui/button";
import { useKeyboardMapping } from '@/hooks/use-keyboard-mapping';
import { useKeyboardHistory } from '@/hooks/use-keyboard-history';
import { useKeyboardClipboard } from '@/hooks/use-keyboard-clipboard';
import { translations } from "@/data/translations";

interface KeyboardPageProps {
  defaultLanguage: string;
}

export function KeyboardPage({ defaultLanguage }: KeyboardPageProps) {
 const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(defaultLanguage);
  const [text, setText] = useState('');
  const [shiftPressed, setShiftPressed] = useState(false);
  const [isPhonetic, setIsPhonetic] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [capsLock, setCapsLock] = useState(false);

  const currentLang = languages.find(lang => 
    location.pathname === `/${lang.name.toLowerCase()}-online-keyboard`
  ) || languages.find(lang => lang.code === defaultLanguage);

  const isRTL = currentLang?.dir === 'rtl';
  const t = translations[language as keyof typeof translations]?.keyboard || translations.en.keyboard;
  const mapPhysicalKey = useKeyboardMapping(language, isPhonetic);
  const { addToHistory, undo, redo, canUndo, canRedo } = useKeyboardHistory();
  const { copyText, pasteText } = useKeyboardClipboard();

  const handleLanguageChange = useCallback((newLang: string) => {
    const lang = languages.find(l => l.code === newLang);
    if (lang) {
      navigate(`/${lang.name.toLowerCase()}-online-keyboard`);
      setLanguage(newLang);
    }
  }, [navigate]);

  useEffect(() => {
    if (currentLang) {
      setLanguage(currentLang.code);
    }
  }, [location.pathname, currentLang]);

  const handleKeyClick = (key: string) => {
    if (selectionStart !== null && selectionEnd !== null) {
      const beforeSelection = text.slice(0, selectionStart);
      const afterSelection = text.slice(selectionEnd);
      const newText = beforeSelection + key + afterSelection;
      setText(newText);
      addToHistory(newText);
      setSelectionStart(selectionStart + key.length);
      setSelectionEnd(selectionStart + key.length);
    } else {
      const newText = text + key;
      setText(newText);
      addToHistory(newText);
    }
  };

  const handleBackspace = () => {
    if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
      const newText = text.slice(0, selectionStart) + text.slice(selectionEnd);
      setText(newText);
      addToHistory(newText);
      setSelectionStart(selectionStart);
      setSelectionEnd(selectionStart);
    } else {
      const newText = text.slice(0, -1);
      setText(newText);
      addToHistory(newText);
    }
  };

  const handleSpecialKey = (key: string) => {
    switch (key) {
      case 'Shift':
        setShiftPressed(!shiftPressed);
        break;
      case 'CapsLock':
        setCapsLock(!capsLock);
        break;
      case 'Tab':
        handleKeyClick('\t');
        break;
      case 'Enter':
        handleKeyClick('\n');
        break;
      case 'Home':
        if (selectionStart !== null) {
          setSelectionStart(0);
          setSelectionEnd(0);
        }
        break;
      case 'End':
        if (selectionEnd !== null) {
          setSelectionStart(text.length);
          setSelectionEnd(text.length);
        }
        break;
    }
  };

  const handleCopy = () => copyText(text);
  
  const handlePaste = async () => {
    const pastedText = await pasteText();
    if (pastedText) {
      setText(text + pastedText);
      addToHistory(text + pastedText);
    }
  };

  const handleCut = async () => {
    const success = await copyText(text);
    if (success) {
      setText('');
      addToHistory('');
    }
  };

  const handleSelectAll = () => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.select();
      setSelectionStart(0);
      setSelectionEnd(text.length);
    }
  };

  const handleUndo = () => {
    const previousText = undo();
    if (previousText !== null) {
      setText(previousText);
    }
  };

  const handleRedo = () => {
    const nextText = redo();
    if (nextText !== null) {
      setText(nextText);
    }
  };

  const handleClear = () => {
    setText('');
    addToHistory('');
  };

  const handleSave = (format: 'txt' | 'doc' | 'pdf') => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `keyboard-text.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSelectionChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'a':
            e.preventDefault();
            handleSelectAll();
            return;
          case 'c':
            e.preventDefault();
            handleCopy();
            return;
          case 'v':
            e.preventDefault();
            handlePaste();
            return;
          case 'x':
            e.preventDefault();
            handleCut();
            return;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            return;
        }
        return;
      }

      if (e.key === 'Shift') {
        setShiftPressed(true);
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const mappedKey = mapPhysicalKey(e.key, e.shiftKey);
        handleKeyClick(mappedKey);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Space' || e.code === 'Space') {
        e.preventDefault();
        handleKeyClick(' ');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    text,
    mapPhysicalKey,
    handleKeyClick,
    handleBackspace,
    handleCopy,
    handlePaste,
    handleCut,
    handleSelectAll,
    handleUndo,
    handleRedo
  ]);

  if (!currentLang) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <Keyboard className="h-8 w-8 text-primary" />
            <span className="flex items-center gap-2">
              <span>{currentLang.flag}</span>
              {currentLang.name} Keyboard
            </span>
          </h1>
        </div>
        
        <div className="bg-card shadow-xl rounded-2xl p-4 sm:p-8 mb-6 border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <LanguageSelector value={language} onValueChange={handleLanguageChange} />
            {language === 'ur' && (
              <Button
                variant={isPhonetic ? "default" : "outline"}
                onClick={() => setIsPhonetic(!isPhonetic)}
                className="w-full sm:w-auto"
              >
                Phonetic
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                addToHistory(e.target.value);
              }}
              onSelect={handleSelectionChange}
              placeholder={t.startTyping}
              className="w-full h-32 text-lg bg-background text-foreground"
              dir={isRTL ? 'rtl' : 'ltr'}
            />

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>

              <Button
                onClick={handlePaste}
                variant="outline"
                className="flex items-center gap-2"
              >
                Paste
              </Button>

              <Button
                onClick={handleCut}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Scissors className="h-4 w-4" />
                Cut
              </Button>

              <Button
                onClick={handleSelectAll}
                variant="outline"
              >
                Select All
              </Button>

              <Button
                onClick={handleUndo}
                variant="outline"
                disabled={!canUndo}
                className="flex items-center gap-2"
              >
                <Undo2 className="h-4 w-4" />
                Undo
              </Button>

              <Button
                onClick={handleRedo}
                variant="outline"
                disabled={!canRedo}
                className="flex items-center gap-2"
              >
                <Redo2 className="h-4 w-4" />
                Redo
              </Button>

              <Button
                onClick={handleClear}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSave('txt')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  TXT
                </Button>

                <Button
                  onClick={() => handleSave('doc')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  DOC
                </Button>

                <Button
                  onClick={() => handleSave('pdf')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>

            <VirtualKeyboard
              language={language}
              onKeyClick={handleKeyClick}
              onBackspace={handleBackspace}
              onSpecialKey={handleSpecialKey}
              shiftPressed={shiftPressed}
              isPhonetic={isPhonetic}
            />
          </div>
        </div>
      </div>
    </div>
  );
}