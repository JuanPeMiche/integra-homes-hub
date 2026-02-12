export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      commission_members: {
        Row: {
          commission_type: string
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          role: string | null
          updated_at: string
        }
        Insert: {
          commission_type: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          commission_type?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      convenios: {
        Row: {
          conditions: string | null
          created_at: string
          cta_label: string | null
          cta_link: string | null
          details: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          main_benefit: string
          name: string
          secondary_logo_url: string | null
          updated_at: string
        }
        Insert: {
          conditions?: string | null
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          details?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          main_benefit: string
          name: string
          secondary_logo_url?: string | null
          updated_at?: string
        }
        Update: {
          conditions?: string | null
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          details?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          main_benefit?: string
          name?: string
          secondary_logo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          residence_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          residence_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          residence_id?: string
          user_id?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          article_type: string
          author: string | null
          category: string | null
          content: string
          created_at: string
          event_end_date: string | null
          event_start_date: string | null
          excerpt: string | null
          external_link: string | null
          id: string
          image_url: string | null
          images: string[] | null
          is_featured: boolean | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
          video_source: string | null
          video_url: string | null
        }
        Insert: {
          article_type?: string
          author?: string | null
          category?: string | null
          content: string
          created_at?: string
          event_end_date?: string | null
          event_start_date?: string | null
          excerpt?: string | null
          external_link?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
          video_source?: string | null
          video_url?: string | null
        }
        Update: {
          article_type?: string
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string
          event_end_date?: string | null
          event_start_date?: string | null
          excerpt?: string | null
          external_link?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
          video_source?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      residence_directors: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          name: string
          photo_url: string | null
          residence_id: string
          role: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          name: string
          photo_url?: string | null
          residence_id: string
          role: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          name?: string
          photo_url?: string | null
          residence_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "residence_directors_residence_id_fkey"
            columns: ["residence_id"]
            isOneToOne: false
            referencedRelation: "residences"
            referencedColumns: ["id"]
          },
        ]
      }
      residence_menus: {
        Row: {
          created_at: string
          id: string
          menu_data: Json
          nota: string | null
          residence_id: string
          season: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          menu_data: Json
          nota?: string | null
          residence_id: string
          season: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          menu_data?: Json
          nota?: string | null
          residence_id?: string
          season?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "residence_menus_residence_id_fkey"
            columns: ["residence_id"]
            isOneToOne: false
            referencedRelation: "residences"
            referencedColumns: ["id"]
          },
        ]
      }
      residences: {
        Row: {
          activities: string[] | null
          address: string
          addresses: string[] | null
          admissions: string[] | null
          capacity: number | null
          certifications: string[] | null
          cities: string[] | null
          city: string
          coordinates_lat: number | null
          coordinates_lng: number | null
          created_at: string
          description: string | null
          email: string | null
          emails: string[] | null
          facebook: string | null
          facilities: string[] | null
          fire_certification: string | null
          id: string
          image: string | null
          images: string[] | null
          instagram: string | null
          is_hidden: boolean | null
          logo_url: string | null
          maps_url: string | null
          mides_certification: string | null
          msp_certification: string | null
          name: string
          phone: string | null
          phones: string[] | null
          price: number | null
          price_range: string | null
          province: string
          rating: number | null
          red_integra: boolean | null
          schedule: string | null
          secondary_name: string | null
          services: string[] | null
          staff_ratio: Json | null
          stay_types: string[] | null
          transparency: number | null
          type: string
          updated_at: string
          video_urls: string[] | null
          website: string | null
          whatsapp: string | null
          whatsapps: string[] | null
        }
        Insert: {
          activities?: string[] | null
          address: string
          addresses?: string[] | null
          admissions?: string[] | null
          capacity?: number | null
          certifications?: string[] | null
          cities?: string[] | null
          city: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string
          description?: string | null
          email?: string | null
          emails?: string[] | null
          facebook?: string | null
          facilities?: string[] | null
          fire_certification?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          instagram?: string | null
          is_hidden?: boolean | null
          logo_url?: string | null
          maps_url?: string | null
          mides_certification?: string | null
          msp_certification?: string | null
          name: string
          phone?: string | null
          phones?: string[] | null
          price?: number | null
          price_range?: string | null
          province: string
          rating?: number | null
          red_integra?: boolean | null
          schedule?: string | null
          secondary_name?: string | null
          services?: string[] | null
          staff_ratio?: Json | null
          stay_types?: string[] | null
          transparency?: number | null
          type: string
          updated_at?: string
          video_urls?: string[] | null
          website?: string | null
          whatsapp?: string | null
          whatsapps?: string[] | null
        }
        Update: {
          activities?: string[] | null
          address?: string
          addresses?: string[] | null
          admissions?: string[] | null
          capacity?: number | null
          certifications?: string[] | null
          cities?: string[] | null
          city?: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string
          description?: string | null
          email?: string | null
          emails?: string[] | null
          facebook?: string | null
          facilities?: string[] | null
          fire_certification?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          instagram?: string | null
          is_hidden?: boolean | null
          logo_url?: string | null
          maps_url?: string | null
          mides_certification?: string | null
          msp_certification?: string | null
          name?: string
          phone?: string | null
          phones?: string[] | null
          price?: number | null
          price_range?: string | null
          province?: string
          rating?: number | null
          red_integra?: boolean | null
          schedule?: string | null
          secondary_name?: string | null
          services?: string[] | null
          staff_ratio?: Json | null
          stay_types?: string[] | null
          transparency?: number | null
          type?: string
          updated_at?: string
          video_urls?: string[] | null
          website?: string | null
          whatsapp?: string | null
          whatsapps?: string[] | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          photo_url: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          photo_url?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          photo_url?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "family" | "residence_manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "family", "residence_manager"],
    },
  },
} as const
