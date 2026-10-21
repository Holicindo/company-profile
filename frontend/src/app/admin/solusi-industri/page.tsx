'use client';

import { useState, useEffect, useMemo } from 'react';
import { Edit, Save, X, Search } from 'lucide-react';
import { api } from '@/lib/api';

export default function SolusiIndustriPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    slug: '',
    description: '',
    descriptionEn: '',
    productIds: [] as number[],
  });
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchDataWithTimeout = async () => {
      const timeoutId = setTimeout(() => {
        if (mounted && loading) {
          console.error('Fetch timeout after 10 seconds');
          setLoading(false);
          setSolutions([]);
          setProducts([]);
        }
      }, 10000);

      try {
        await fetchData();
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchDataWithTimeout();

    return () => {
      mounted = false;
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching solutions from:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011/api'}/solutions`);
      
      const [solutionsRes, productsRes] = await Promise.all([
        api.get('/solutions'),
        api.get('/products', { params: { limit: 1000 } }),
      ]);
      
      console.log('Solutions response:', solutionsRes.data);
      console.log('Products response:', productsRes.data);
      
      setSolutions(solutionsRes.data || []);
      setProducts(productsRes.data.items || productsRes.data || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      console.error('Error details:', error.response?.data || error.message);
      // Only show toast for initial load errors, not for edit errors
      // setToast({ type: 'error', message: `Gagal memuat data: ${error.message}` });
      // Set empty arrays to stop loading
      setSolutions([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (solution: any) => {
    setEditingId(solution.id);
    
    try {
      const linkedProductsRes = await api.get(`/solutions/${solution.id}/linked-products`);
      
      setFormData({
        name: solution.name || '',
        nameEn: solution.nameEn || '',
        slug: solution.slug || '',
        description: solution.description || '',
        descriptionEn: solution.descriptionEn || '',
        productIds: linkedProductsRes.data || [],
      });
    } catch (error) {
      console.error('Error fetching linked products:', error);
      // Silent fail - just set empty array, no toast popup
      setFormData({
        name: solution.name || '',
        nameEn: solution.nameEn || '',
        slug: solution.slug || '',
        description: solution.description || '',
        descriptionEn: solution.descriptionEn || '',
        productIds: [],
      });
    }
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await api.put(`/solutions/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('holic_admin_token')}`,
        },
      });
      
      setToast({ type: 'success', message: 'Solusi berhasil diperbarui!' });
      setEditingId(null);
      setSearchQuery('');
      fetchData();
    } catch (error: any) {
      console.error('Error saving solution:', error);
      setToast({ type: 'error', message: error.response?.data?.message || 'Gagal menyimpan solusi' });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setSearchQuery('');
    setFormData({
      name: '',
      nameEn: '',
      slug: '',
      description: '',
      descriptionEn: '',
      productIds: [],
    });
  };

  const toggleProductSelection = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      (product.sku && product.sku.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#2C1810]">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-bold animate-fade-in`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Solusi by Industri</h1>
        <p className="text-[#2C1810]/60">Kelola solusi industri dan link produk terkait</p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="bg-white border-2 border-[#2C1810]/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            {editingId === solution.id ? (
              // Edit Mode
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#2C1810]">Edit: {solution.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="p-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#b08f3b] transition-colors"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-bold text-[#2C1810] mb-2">Nama (ID)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#2C1810]/20 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2C1810] mb-2">Nama (EN)</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-[#2C1810]/20 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2C1810] mb-2">Deskripsi (ID)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-[#2C1810]/20 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2C1810] mb-2">Deskripsi (EN)</label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-[#2C1810]/20 rounded-lg focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                {/* Product Selection with Thumbnails */}
                <div>
                  <label className="block text-sm font-bold text-[#2C1810] mb-2">
                    Produk Terkait ({formData.productIds.length} dipilih)
                  </label>
                  
                  {/* Search Box */}
                  <div className="mb-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C1810]/40" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari produk berdasarkan nama atau SKU..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#2C1810]/20 rounded-lg focus:border-[#C9A84C] focus:outline-none text-sm"
                    />
                  </div>

                  {/* Product List */}
                  <div className="max-h-96 overflow-y-auto border-2 border-[#2C1810]/20 rounded-lg p-3 space-y-2">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <label
                          key={product.id}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                            formData.productIds.includes(product.id)
                              ? 'bg-[#C9A84C]/10 border-[#C9A84C] shadow-sm'
                              : 'bg-white border-transparent hover:bg-[#F6F1E6] hover:border-[#2C1810]/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.productIds.includes(product.id)}
                            onChange={() => toggleProductSelection(product.id)}
                            className="w-5 h-5 text-[#C9A84C] border-[#2C1810]/20 rounded focus:ring-[#C9A84C] flex-shrink-0"
                          />
                          
                          {/* Product Thumbnail */}
                          <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg border border-[#2C1810]/10 overflow-hidden shadow-sm">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#F6F1E6]">
                                <span className="text-[#2C1810]/30 text-xs font-bold">No Img</span>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#2C1810] line-clamp-2">{product.name}</p>
                            {product.sku && (
                              <p className="text-xs text-[#2C1810]/50 mt-1">SKU: {product.sku}</p>
                            )}
                          </div>

                          {/* Selected Badge */}
                          {formData.productIds.includes(product.id) && (
                            <div className="flex-shrink-0 px-2 py-1 bg-[#C9A84C] text-white text-xs font-bold rounded">
                              ✓
                            </div>
                          )}
                        </label>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-[#2C1810]/50">Tidak ada produk ditemukan</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#2C1810] mb-1">{solution.name}</h3>
                    <p className="text-sm text-[#2C1810]/60">Slug: {solution.slug}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(solution)}
                    className="p-2 bg-[#C9A84C]/10 text-[#C9A84C] rounded-lg hover:bg-[#C9A84C]/20 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                </div>

                {solution.description && (
                  <p className="text-sm text-[#2C1810]/70 mb-3">{solution.description}</p>
                )}

                <div className="pt-3 border-t border-[#2C1810]/10">
                  <p className="text-xs font-bold text-[#2C1810]/50 uppercase tracking-wider">
                    Produk akan dimuat saat edit
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
