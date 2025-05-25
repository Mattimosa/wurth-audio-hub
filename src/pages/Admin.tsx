
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSeriesManager from '../components/AdminSeriesManager';
import AdminEpisodeManager from '../components/AdminEpisodeManager';
import { BarChart3, FileAudio, Folder } from 'lucide-react';

const Admin = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Centro di Controllo Podcast</h1>
          <p className="text-gray-400">Gestisci contenuti e serie della piattaforma Würth Podcast</p>
        </div>
        
        <Tabs defaultValue="series" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="series" className="data-[state=active]:bg-wurth-red">
              <Folder className="w-4 h-4 mr-2" />
              Serie
            </TabsTrigger>
            <TabsTrigger value="episodes" className="data-[state=active]:bg-wurth-red">
              <FileAudio className="w-4 h-4 mr-2" />
              Episodi
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-wurth-red">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="series" className="mt-6">
            <AdminSeriesManager />
          </TabsContent>
          
          <TabsContent value="episodes" className="mt-6">
            <AdminEpisodeManager />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400">
                Sezione Analytics in arrivo - qui vedrai statistiche di ascolto e engagement
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
