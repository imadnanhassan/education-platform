'use client';
import { useState } from 'react';

interface PDFViewerProps {
    pdfUrl: string;
    title: string;
    onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => window.open(pdfUrl, '_blank')}
                            className="px-4 py-2 bg-emerald-500 text-white font-medium transition-all duration-300 hover:bg-emerald-600"
                        >
                            নতুন ট্যাবে খুলুন
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* PDF Content */}
                <div className="flex-1 relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">PDF লোড হচ্ছে...</p>
                            </div>
                        </div>
                    )}
                    
                    {/* PDF Embed */}
                    <iframe
                        src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                        className="w-full h-full border-0"
                        title={title}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                    
                    {/* Fallback for browsers that don't support PDF embedding */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50" style={{ display: isLoading ? 'none' : 'flex' }}>
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">PDF দেখতে সমস্যা হচ্ছে?</h4>
                            <p className="text-gray-600 mb-6">আপনার ব্রাউজার PDF সাপোর্ট করছে না। নিচের বাটনে ক্লিক করে PDF ডাউনলোড করুন।</p>
                            <div className="space-y-3">
                                <a
                                    href={pdfUrl}
                                    download
                                    className="inline-block px-6 py-3 bg-emerald-500 text-white font-medium transition-all duration-300 hover:bg-emerald-600"
                                >
                                    PDF ডাউনলোড করুন
                                </a>
                                <br />
                                <button
                                    onClick={() => window.open(pdfUrl, '_blank')}
                                    className="inline-block px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-medium transition-all duration-300 hover:bg-emerald-50"
                                >
                                    নতুন ট্যাবে খুলুন
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>PDF ভিউয়ার - গ্র্যাভিটন একাডেমি</span>
                        <div className="flex items-center space-x-4">
                            <a
                                href={pdfUrl}
                                download
                                className="flex items-center text-emerald-600 hover:text-emerald-700"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                ডাউনলোড
                            </a>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center text-gray-600 hover:text-gray-700"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                প্রিন্ট
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFViewer;