'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTeachers } from '@/lib/hooks/useTeachers';
import { Teacher, CreateTeacherRequest, UpdateTeacherRequest } from '@/store/types/teacher';
import { createTeacherSchema, updateTeacherSchema } from '@/lib/validations/teacher';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Icons
import IconUser from '@/components/icon/icon-user';
import IconPlus from '@/components/icon/icon-plus';
import IconTrash from '@/components/icon/icon-trash';
import IconX from '@/components/icon/icon-x';

// UI Components
import { FormField, FormTextarea, FormSelect } from '@/components/ui/FormField';
import { FileUpload } from '@/components/ui/FileUpload';

interface TeacherFormProps {
  teacher?: Teacher;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ 
  teacher, 
  onSuccess, 
  onCancel 
}) => {
  const router = useRouter();
  const { addTeacher, editTeacher, loading } = useTeachers();
  const [activeTab, setActiveTab] = useState('basic');
  const [specializations, setSpecializations] = useState<string[]>(
    teacher?.specializations || ['']
  );
  const [preferredSubjects, setPreferredSubjects] = useState<string[]>(
    teacher?.preferredSubjects || ['']
  );

  // Helper functions for managing string arrays
  const addSpecialization = () => {
    setSpecializations([...specializations, '']);
  };

  const removeSpecialization = (index: number) => {
    if (specializations.length > 1) {
      setSpecializations(specializations.filter((_, i) => i !== index));
    }
  };

  const updateSpecialization = (index: number, value: string) => {
    const updated = [...specializations];
    updated[index] = value;
    setSpecializations(updated);
  };

  const addPreferredSubject = () => {
    setPreferredSubjects([...preferredSubjects, '']);
  };

  const removePreferredSubject = (index: number) => {
    if (preferredSubjects.length > 1) {
      setPreferredSubjects(preferredSubjects.filter((_, i) => i !== index));
    }
  };

  const updatePreferredSubject = (index: number, value: string) => {
    const updated = [...preferredSubjects];
    updated[index] = value;
    setPreferredSubjects(updated);
  };

  const isEditing = !!teacher;
  const schema = isEditing ? updateTeacherSchema : createTeacherSchema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: teacher?.firstName || '',
      lastName: teacher?.lastName || '',
      email: teacher?.email || '',
      phone: teacher?.phone || '',
      dateOfBirth: teacher?.dateOfBirth || '',
      gender: teacher?.gender || 'male',
      address: teacher?.address || {
        street: '',
        city: '',
        district: '',
        division: '',
        postalCode: '',
        country: 'Bangladesh',
      },
      qualifications: teacher?.qualifications?.map(q => ({
        degree: q.degree,
        institution: q.institution,
        year: q.year,
        grade: q.grade || '',
        subject: q.subject || '',
      })) || [{ degree: '', institution: '', year: '', grade: '', subject: '' }],
      experience: teacher?.experience?.map(e => ({
        position: e.position,
        organization: e.organization,
        startDate: e.startDate,
        endDate: e.endDate || '',
        description: e.description || '',
        isCurrent: e.isCurrent || false,
      })) || [],
      specializations: teacher?.specializations || [''],
      avatar: teacher?.avatar || '',
      bio: teacher?.bio || '',
      bioEn: teacher?.bioEn || '',
      socialLinks: teacher?.socialLinks || {
        facebook: '',
        linkedin: '',
        twitter: '',
        website: '',
        youtube: '',
      },
      joinDate: teacher?.joinDate || new Date().toISOString().split('T')[0],
      salary: teacher?.salary || 0,
      emergencyContact: teacher?.emergencyContact || {
        name: '',
        relationship: '',
        phone: '',
      },
      isPublicProfile: teacher?.isPublicProfile ?? true,
      canTeachOnline: teacher?.canTeachOnline ?? true,
      preferredSubjects: teacher?.preferredSubjects || [''],
      ...(isEditing && { id: teacher!.id }),
    },
  });

  const { handleSubmit, control } = methods;

  // Field arrays for dynamic fields
  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: 'qualifications',
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      // Filter out empty specializations and preferred subjects
      const cleanedData = {
        ...data,
        specializations: specializations.filter((spec: string) => spec.trim() !== ''),
        preferredSubjects: preferredSubjects.filter((subject: string) => subject.trim() !== ''),
      };

      if (isEditing) {
        await editTeacher(cleanedData as UpdateTeacherRequest);
        toast.success('শিক্ষকের তথ্য সফলভাবে আপডেট হয়েছে');
      } else {
        await addTeacher(cleanedData as CreateTeacherRequest);
        toast.success('নতুন শিক্ষক সফলভাবে যোগ করা হয়েছে');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin-teachers');
      }
    } catch (error) {
      console.error('Teacher form submission error:', error);
      toast.error('একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  const tabs = [
    { id: 'basic', label: 'মৌলিক তথ্য', icon: IconUser },
    { id: 'qualifications', label: 'শিক্ষাগত যোগ্যতা', icon: IconUser },
    { id: 'experience', label: 'কর্মঅভিজ্ঞতা', icon: IconUser },
    { id: 'additional', label: 'অতিরিক্ত তথ্য', icon: IconUser },
  ];

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isEditing ? 'শিক্ষকের তথ্য সম্পাদনা' : 'নতুন শিক্ষক যোগ করুন'}
              </h2>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <IconX className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="firstName"
                    label="নাম"
                    placeholder="শিক্ষকের নাম লিখুন"
                    required
                  />
                  <FormField
                    name="lastName"
                    label="পদবি"
                    placeholder="শিক্ষকের পদবি লিখুন"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="dateOfBirth"
                    label="জন্ম তারিখ"
                    type="date"
                    required
                  />
                  <FormSelect
                    name="gender"
                    label="লিঙ্গ"
                    options={[
                      { value: 'male', label: 'পুরুষ' },
                      { value: 'female', label: 'মহিলা' },
                      { value: 'other', label: 'অন্যান্য' },
                    ]}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="joinDate"
                    label="যোগদানের তারিখ"
                    type="date"
                    required
                  />
                  <FormField
                    name="salary"
                    label="বেতন (ঐচ্ছিক)"
                    type="number"
                    placeholder="মাসিক বেতন"
                  />
                </div>

                {/* Avatar Upload */}
                <div>
                  <FileUpload
                    name="avatar"
                    label="প্রোফাইল ছবি"
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    description="JPG, PNG, GIF সর্বোচ্চ 5MB"
                  />
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">ঠিকানা</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      name="address.street"
                      label="রাস্তা/বাড়ি নম্বর"
                      placeholder="রাস্তা ও বাড়ি নম্বর"
                      required
                    />
                    <FormField
                      name="address.city"
                      label="শহর/এলাকা"
                      placeholder="শহর বা এলাকার নাম"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      name="address.district"
                      label="জেলা"
                      placeholder="জেলার নাম"
                      required
                    />
                    <FormField
                      name="address.division"
                      label="বিভাগ"
                      placeholder="বিভাগের নাম"
                      required
                    />
                    <FormField
                      name="address.postalCode"
                      label="পোস্টাল কোড"
                      placeholder="পোস্টাল কোড"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Qualifications Tab */}
            {activeTab === 'qualifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    শিক্ষাগত যোগ্যতা
                  </h3>
                  <button
                    type="button"
                    onClick={() => appendQualification({ degree: '', institution: '', year: '', grade: '', subject: '' })}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <IconPlus className="w-4 h-4" />
                    <span>যোগ করুন</span>
                  </button>
                </div>

                {qualificationFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        যোগ্যতা {index + 1}
                      </h4>
                      {qualificationFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        name={`qualifications.${index}.degree`}
                        label="ডিগ্রি/সার্টিফিকেট"
                        placeholder="যেমন: এসএসসি, এইচএসসি, স্নাতক"
                        required
                      />
                      <FormField
                        name={`qualifications.${index}.institution`}
                        label="প্রতিষ্ঠান"
                        placeholder="শিক্ষা প্রতিষ্ঠানের নাম"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <FormField
                        name={`qualifications.${index}.year`}
                        label="পাসের বছর"
                        placeholder="২০২০"
                        required
                      />
                      <FormField
                        name={`qualifications.${index}.grade`}
                        label="গ্রেড/ফলাফল"
                        placeholder="A+, ৫.০০"
                      />
                      <FormField
                        name={`qualifications.${index}.subject`}
                        label="বিষয়"
                        placeholder="প্রধান বিষয়"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    কর্মঅভিজ্ঞতা
                  </h3>
                  <button
                    type="button"
                    onClick={() => appendExperience({ 
                      position: '', 
                      organization: '', 
                      startDate: '', 
                      endDate: '', 
                      description: '', 
                      isCurrent: false 
                    })}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <IconPlus className="w-4 h-4" />
                    <span>যোগ করুন</span>
                  </button>
                </div>

                {experienceFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        অভিজ্ঞতা {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        name={`experience.${index}.position`}
                        label="পদবি"
                        placeholder="যেমন: সহকারী শিক্ষক"
                        required
                      />
                      <FormField
                        name={`experience.${index}.organization`}
                        label="প্রতিষ্ঠান"
                        placeholder="কর্মস্থলের নাম"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        name={`experience.${index}.startDate`}
                        label="শুরুর তারিখ"
                        type="date"
                        required
                      />
                      <FormField
                        name={`experience.${index}.endDate`}
                        label="শেষের তারিখ"
                        type="date"
                        disabled={methods.watch(`experience.${index}.isCurrent`)}
                      />
                    </div>
                    <div className="mt-4">
                      <FormTextarea
                        name={`experience.${index}.description`}
                        label="কাজের বিবরণ"
                        placeholder="এই পদে কী কী কাজ করেছেন তার বিবরণ"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Information Tab */}
            {activeTab === 'additional' && (
              <div className="space-y-6">
                {/* Specializations */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      বিশেষত্ব
                    </h3>
                    <button
                      type="button"
                      onClick={addSpecialization}
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <IconPlus className="w-4 h-4" />
                      <span>যোগ করুন</span>
                    </button>
                  </div>
                  {specializations.map((specialization, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => updateSpecialization(index, e.target.value)}
                        placeholder="যেমন: গণিত, পদার্থবিজ্ঞান"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      {specializations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecialization(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Preferred Subjects */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      পছন্দের বিষয়
                    </h3>
                    <button
                      type="button"
                      onClick={addPreferredSubject}
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <IconPlus className="w-4 h-4" />
                      <span>যোগ করুন</span>
                    </button>
                  </div>
                  {preferredSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => updatePreferredSubject(index, e.target.value)}
                        placeholder="পছন্দের বিষয়"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      {preferredSubjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePreferredSubject(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <FormTextarea
                  name="bio"
                  label="জীবনী (বাংলা)"
                  placeholder="শিক্ষকের সংক্ষিপ্ত জীবনী লিখুন"
                  rows={4}
                />

                <FormTextarea
                  name="bioEn"
                  label="জীবনী (ইংরেজি)"
                  placeholder="Teacher's brief biography in English"
                  rows={4}
                />

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    সামাজিক যোগাযোগ মাধ্যম
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="socialLinks.facebook"
                      label="Facebook"
                      placeholder="https://facebook.com/username"
                    />
                    <FormField
                      name="socialLinks.linkedin"
                      label="LinkedIn"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="socialLinks.twitter"
                      label="Twitter"
                      placeholder="https://twitter.com/username"
                    />
                    <FormField
                      name="socialLinks.website"
                      label="Website"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    জরুরি যোগাযোগ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      name="emergencyContact.name"
                      label="নাম"
                      placeholder="জরুরি যোগাযোগের নাম"
                    />
                    <FormField
                      name="emergencyContact.relationship"
                      label="সম্পর্ক"
                      placeholder="যেমন: পিতা, মাতা, স্বামী"
                    />
                    <FormField
                      name="emergencyContact.phone"
                      label="ফোন নম্বর"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  বাতিল
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>{isEditing ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default TeacherForm;