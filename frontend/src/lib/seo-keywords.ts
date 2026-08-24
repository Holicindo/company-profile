export interface CategorySeoInfo {
  title: string;
  h1: string;
  description: string;
}

export const CATEGORY_SEO_MAP: Record<string, CategorySeoInfo> = {
  showcase: {
    title: 'Jual Showcase Chiller Komersial & Pendingin Minuman - Holicindo',
    h1: 'Showcase Chiller Komersial & Pendingin Minuman',
    description: 'Jual showcase chiller komersial & display cooler pendingin minuman berkualitas untuk resto, minimarket, & toko F&B. Bergaransi resmi Holicindo.',
  },
  refrigerator: {
    title: 'Jual Refrigerator Komersial & Commercial Cold Storage - Holicindo',
    h1: 'Refrigerator Komersial & Cold Storage Industri',
    description: 'Temukan refrigerator komersial heavy-duty, upright chiller & undercounter freezer untuk dapur restoran & industri F&B. Garansi resmi Holicindo.',
  },
  blastfreezer: {
    title: 'Jual Blast Freezer Komersial & Pembeku Cepat Industri - Holicindo',
    h1: 'Blast Freezer Komersial & Mesin Pembeku Cepat',
    description: 'Jual blast freezer industri teknologi pembekuan cepat higienis untuk adonan bakery, daging, & makanan beku. Garansi resmi Holicindo.',
  },
  icemaker: {
    title: 'Jual Ice Maker Komersial & Mesin Es Batu Industri - Holicindo',
    h1: 'Ice Maker Komersial & Mesin Pembuat Es Batu',
    description: 'Mesin pembuat es batu komersial otomatis (cube & flake ice maker) hemat energi untuk cafe, restoran, & hotel di seluruh Indonesia.',
  },
  mixer: {
    title: 'Jual Mixer Komersial & Mesin Pengaduk Adonan Bakery - Holicindo',
    h1: 'Mixer Komersial & Pengaduk Adonan Bakery',
    description: 'Jual mixer komersial heavy-duty, planetary mixer & spiral mixer untuk toko roti, bakery, & katering di seluruh Indonesia.',
  },
  machinery: {
    title: 'Jual Mesin Industrial & Peralatan Produksi F&B - Holicindo',
    h1: 'Mesin Industrial & Peralatan Produksi Food & Beverage',
    description: 'Distributor mesin industrial & mesin produksi makanan komersial terlengkap. Solusi efisiensi industri F&B dari Holicindo.',
  },
};

export function getCategorySeo(slug?: any): CategorySeoInfo {
  if (!slug || typeof slug !== 'string') {
    return {
      title: 'Katalog Produk Mesin Industrial & Peralatan Komersial - Holicindo',
      h1: 'Katalog Produk',
      description: 'Temukan lebih dari 282 mesin industrial dan peralatan komersial untuk mendukung operasional bisnis Food & Beverage Anda.',
    };
  }
  const normalized = slug.toLowerCase();
  if (CATEGORY_SEO_MAP[normalized]) {
    return CATEGORY_SEO_MAP[normalized];
  }
  const formattedName = slug.replace(/-/g, ' ').toUpperCase();
  return {
    title: `Jual ${formattedName} Komersial & Peralatan Industri - Holicindo`,
    h1: `${formattedName} Komersial & Industri`,
    description: `Temukan pilihan ${formattedName} komersial & peralatan industri F&B terbaik dari Holicindo. Garansi resmi & pengiriman seluruh Indonesia.`,
  };
}
