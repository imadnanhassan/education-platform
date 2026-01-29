'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import AdminLayout from '@/components/layouts/admin/AdminLayout';

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <AdminLayout>
                {children}
            </AdminLayout>
        </Provider>
    );
}