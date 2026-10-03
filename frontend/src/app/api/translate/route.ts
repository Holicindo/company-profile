import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, from = 'id', to = 'en' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    let res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`);
    
    let translatedText = '';
    
    if (res.ok) {
      const data = await res.json();
      if (data && data[0]) {
        data[0].forEach((item: any) => {
          if (item[0]) translatedText += item[0];
        });
      }
    }

    // Fallback to MyMemory API if Google fails or blocks IP
    if (!translatedText) {
      res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
      if (res.ok) {
        const data = await res.json();
        if (data.responseData && data.responseData.translatedText) {
          translatedText = data.responseData.translatedText;
        }
      }
    }

    if (!translatedText) {
      throw new Error('No translation returned from both APIs');
    }

    return NextResponse.json({ result: translatedText });
  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed', details: error.message }, { status: 500 });
  }
}
