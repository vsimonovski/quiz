import React from 'react';

interface FormProps {
    children: React.ReactNode;
    title: string;
}

interface AuthFields {
    username: string;
    password: string;
}


export type { FormProps, AuthFields };
