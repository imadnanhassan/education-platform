'use client';

import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useStudents } from '@/lib/hooks/useStudents';
import { Student, CreateStudentFormData, UpdateStudentFormData } from '@/store/types/student';
import { createStudentSchema, updateStudentSchema, createFormConfig } from '@/lib/validations';
import { FormField, FormTextarea, FormSelect, FormRadioGroup } from '@/components/ui/FormField';
import { ImageUpload } from '@/components/ui/FileUpload';
import { cn } from '@/utils/cn';

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: CreateStudentFormData | UpdateStudentFormData) => Promise<void>;
  onCancel: () => void;
  className?: string;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSubmit,
  onCancel,
  className,
}) => {
  const { loading } = useStudents();
  const isEditing = !!student;

  const schema = isEditing ? updateStudentSchema : createStudentSchema;
  const defaultValues = isEditing
    ? {
        ...student,
        dateOfBirth: student?.dateOfBirth?.split('T')[0], // Format for date input
      }
    : {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: 'male' as const,
        address: {
          street: '',
          city: '',
          district: '',
          division: '',
          postalCode: '',
          country: 'Bangladesh',
        },
        guardian: {
          name: '',
          relationship: 'পিতা',
          phone: '',
          email: '',
          occupation: '',
        },
        academicInfo: {
          class: '',
          section: '',
          rollNumber: '',
          institution: '',
          board: '',
          passingYear: '',
        },
        status: 'active' as const,
        avatar: '',
        nationality: 'Bangladeshi',
        religion: '',
        bloodGroup: undefined,
        emergencyContact: {
          name: '',
          relationship: '',
          phone: '',
        },
      };

  const methods = useForm(createFormConfig(schema, defaultValues));
  const { handleSubmit, reset, watch, formState: { errors, isSubmitting } } = methods;

  useEffect(() => {
    if (student) {
      reset({
        ...student,
        dateOfBirth: student.dateOfBirth?.split('T')[0],
      });
    }
  }, [student, reset]);

  const onFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const districtOptions = [
    { value: 'ঢাকা', label: 'ঢাকা' },
    { value: 'চট্টগ্রাম', label: 'চট্টগ্রাম' },
    { value: 'সিলেট', label: 'সিলেট' },
    { value: 'রাজশাহী', label: 'রাজশাহী' },
    { value: 'খুলনা', label: 'খুলনা' },
    { value: 'বরিশাল', label: 'বরিশাল' },
    { value: 'রংপুর', label: 'রংপুর' },
    { value: 'ময়মনসিংহ', label: 'ময়মনসিংহ' },
  ];

  const divisionOptions = [
    { value: 'ঢাকা', label: 'ঢাকা' },
    { value: 'চট্টগ্রাম', label: 'চট্টগ্রাম' },
    { value: 'সিলেট', label: 'সিলেট' },
    { value: 'রাজশাহী', label: 'রাজশাহী' },
    { value: 'খুলনা', label: 'খুলনা' },
    { value: 'বরিশাল', label: 'বরিশাল' },
    { value: 'রংপুর', label: 'রংপুর' },
    { value: 'ময়মনসিংহ', label: 'ময়মনসিংহ' },
  ];

  const classOptions = [
    { value: '৬ষ্ঠ', label: '৬ষ্ঠ শ্রেণী' },
    { value: '৭ম', label: '৭ম শ্রেণী' },
    { value: '৮ম', label: '৮ম শ্রেণী' },
    { value: '৯ম', label: '৯ম শ্রেণী' },
    { value: '১০ম', label: '১০ম শ্রেণী (SSC)' },
    { value: '১১শ', label: '১১শ শ্রেণী (HSC)' },
    { value: '১২শ', label: '১২শ শ্রেণী (HSC)' },
    { value: 'স্নাতক ১ম বর্ষ', label: 'স্নাতক ১ম বর্ষ' },
    { value: 'স্নাতক ২য় বর্ষ', label: 'স্নাতক ২য় বর্ষ' },
    { value: 'স্নাতক ৩য় বর্ষ', label: 'স্নাতক ৩য় বর্ষ' },
    { value: 'স্নাতক ৪র্থ বর্ষ', label: 'স্নাতক ৪র্থ বর্ষ' },
  ];

  const boardOptions = [
    { value: 'ঢাকা', label: 'ঢাকা বোর্ড' },
    { value: 'চট্টগ্রাম', label: 'চট্টগ্রাম বোর্ড' },
    { value: 'কুমিল্লা', label: 'কুমিল্লা বোর্ড' },
    { value: 'রাজশাহী', label: 'রাজশাহী বোর্ড' },
    { value: 'যশোর', label: 'যশোর বোর্ড' },
    { value: 'বরিশাল', label: 'বরিশাল বোর্ড' },
    { value: 'সিলেট', label: 'সিলেট বোর্ড' },
    { value: 'দিনাজপুর', label: 'দিনাজপুর বোর্ড' },
    { value: 'মাদ্রাসা', label: 'মাদ্রাসা বোর্ড' },
    { value: 'কারিগরি', label: 'কারিগরি বোর্ড' },
  ];

  const relationshipOptions = [
    { value: 'পিতা', label: 'পিতা' },
    { value: 'মাতা', label: 'মাতা' },
    { value: 'ভাই', label: 'ভাই' },
    { value: 'বোন', label: 'বোন' },
    { value: 'দাদা', label: 'দাদা' },
    { value: 'দাদী', label: 'দাদী' },
    { value: 'নানা', label: 'নানা' },
    { value: 'নানী', label: 'নানী' },
    { value: 'চাচা', label: 'চাচা' },
    { value: 'মামা', label: 'মামা' },
    { value: 'অন্যান্য', label: 'অন্যান্য' },
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const genderOptions = [
    { value: 'male', label: 'পুরুষ' },
    { value: 'female', label: 'মহিলা' },
    { value: 'other', label: 'অন্যান্য' },
  ];

  const statusOptions = [
    { value: 'active', label: 'সক্রিয়' },
    { value: 'inactive', label: 'নিষ্ক্রিয়' },
    { value: 'suspended', label: 'স্থগিত' },
  ];

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {isEditing ? 'শিক্ষার্থীর তথ্য সম্পাদনা' : 'নতুন শিক্ষার্থী যোগ করুন'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing 
                ? 'শিক্ষার্থীর তথ্য আপডেট করুন। সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন।'
                : 'নতুন শিক্ষার্থীর সম্পূর্ণ তথ্য প্রদান করুন। সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন।'
              }
            </p>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">ব্যক্তিগত তথ্য</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="firstName"
                label="নাম"
                placeholder="শিক্ষার্থীর নাম লিখুন"
                required
              />
              
              <FormField
                name="lastName"
                label="পদবি"
                placeholder="শিক্ষার্থীর পদবি লিখুন"
                required
              />
              
              <FormField
                name="email"
                label="ইমেইল"
                type="email"
                placeholder="example@email.com"
                required
              />
              
              <FormField
                name="phone"
                label="ফোন নম্বর"
                type="tel"
                placeholder="01XXXXXXXXX"
                required
              />
              
              <FormField
                name="dateOfBirth"
                label="জন্ম তারিখ"
                type="date"
                required
              />
              
              <FormRadioGroup
                name="gender"
                label="লিঙ্গ"
                options={genderOptions}
                required
                orientation="horizontal"
              />
              
              <FormSelect
                name="bloodGroup"
                label="রক্তের গ্রুপ"
                options={bloodGroupOptions}
                placeholder="রক্তের গ্রুপ নির্বাচন করুন"
              />
              
              <FormField
                name="nationality"
                label="জাতীয়তা"
                placeholder="জাতীয়তা লিখুন"
                required
              />
              
              <FormField
                name="religion"
                label="ধর্ম"
                placeholder="ধর্ম লিখুন"
              />
              
              {isEditing && (
                <FormSelect
                  name="status"
                  label="অবস্থা"
                  options={statusOptions}
                  required
                />
              )}
            </div>

            <div className="mt-6">
              <ImageUpload
                name="avatar"
                label="প্রোফাইল ছবি"
                description="JPG, PNG বা GIF ফরম্যাটে সর্বোচ্চ 5MB আকারের ছবি আপলোড করুন"
                aspectRatio="square"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">ঠিকানা</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="address.street"
                label="রাস্তার ঠিকানা"
                placeholder="বাড়ি/রোড নম্বর, এলাকা"
                required
                className="md:col-span-2"
              />
              
              <FormField
                name="address.city"
                label="শহর/উপজেলা"
                placeholder="শহর বা উপজেলার নাম"
                required
              />
              
              <FormSelect
                name="address.district"
                label="জেলা"
                options={districtOptions}
                required
              />
              
              <FormSelect
                name="address.division"
                label="বিভাগ"
                options={divisionOptions}
                required
              />
              
              <FormField
                name="address.postalCode"
                label="পোস্টাল কোড"
                placeholder="1234"
                required
              />
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">অভিভাবকের তথ্য</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="guardian.name"
                label="অভিভাবকের নাম"
                placeholder="অভিভাবকের পূর্ণ নাম"
                required
              />
              
              <FormSelect
                name="guardian.relationship"
                label="সম্পর্ক"
                options={relationshipOptions}
                required
              />
              
              <FormField
                name="guardian.phone"
                label="অভিভাবকের ফোন"
                type="tel"
                placeholder="01XXXXXXXXX"
                required
              />
              
              <FormField
                name="guardian.email"
                label="অভিভাবকের ইমেইল"
                type="email"
                placeholder="guardian@email.com"
              />
              
              <FormField
                name="guardian.occupation"
                label="পেশা"
                placeholder="অভিভাবকের পেশা"
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">শিক্ষাগত তথ্য</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                name="academicInfo.class"
                label="শ্রেণী"
                options={classOptions}
                required
              />
              
              <FormField
                name="academicInfo.section"
                label="শাখা"
                placeholder="ক, খ, গ"
              />
              
              <FormField
                name="academicInfo.rollNumber"
                label="রোল নম্বর"
                placeholder="রোল নম্বর"
              />
              
              <FormSelect
                name="academicInfo.board"
                label="শিক্ষা বোর্ড"
                options={boardOptions}
                required
              />
              
              <FormField
                name="academicInfo.institution"
                label="শিক্ষা প্রতিষ্ঠান"
                placeholder="স্কুল/কলেজের নাম"
                required
                className="md:col-span-2"
              />
              
              <FormField
                name="academicInfo.passingYear"
                label="পাসের বছর"
                placeholder="2024"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">জরুরি যোগাযোগ</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                name="emergencyContact.name"
                label="নাম"
                placeholder="জরুরি যোগাযোগের নাম"
              />
              
              <FormSelect
                name="emergencyContact.relationship"
                label="সম্পর্ক"
                options={relationshipOptions}
                placeholder="সম্পর্ক নির্বাচন করুন"
              />
              
              <FormField
                name="emergencyContact.phone"
                label="ফোন নম্বর"
                type="tel"
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isSubmitting || loading.create || loading.update}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {(isSubmitting || loading.create || loading.update) && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>
                  {isEditing ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </span>
              </button>
            </div>
          </div>

          {/* Form Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                ফর্মে কিছু ত্রুটি রয়েছে:
              </h4>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>
                    • {error?.message as string}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};