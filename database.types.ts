export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenge: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          type: Database["public"]["Enums"]["quest_type"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          type?: Database["public"]["Enums"]["quest_type"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          type?: Database["public"]["Enums"]["quest_type"] | null
        }
        Relationships: []
      }
      contents: {
        Row: {
          created_at: string
          description: string | null
          id: number
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tag: number
          thumbnail: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tag?: number
          thumbnail?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tag?: number
          thumbnail?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contents_slug_fkey"
            columns: ["slug"]
            isOneToOne: false
            referencedRelation: "views"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "public_contents_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "contents_tag"
            referencedColumns: ["id"]
          },
        ]
      }
      contents_tag: {
        Row: {
          created_at: string
          icon: string | null
          id: number
          name: string
          path: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: number
          name: string
          path?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: number
          name?: string
          path?: string | null
        }
        Relationships: []
      }
      home_rolling_banner: {
        Row: {
          background_color: string | null
          background_image: string | null
          click_path: string | null
          created_at: string
          id: number
          impression_ended: string | null
          impression_started: string
          status: Database["public"]["Enums"]["banner_status"]
          sub_title: string | null
          title: string | null
          type: Database["public"]["Enums"]["banner_type"]
        }
        Insert: {
          background_color?: string | null
          background_image?: string | null
          click_path?: string | null
          created_at?: string
          id?: number
          impression_ended?: string | null
          impression_started: string
          status?: Database["public"]["Enums"]["banner_status"]
          sub_title?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["banner_type"]
        }
        Update: {
          background_color?: string | null
          background_image?: string | null
          click_path?: string | null
          created_at?: string
          id?: number
          impression_ended?: string | null
          impression_started?: string
          status?: Database["public"]["Enums"]["banner_status"]
          sub_title?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["banner_type"]
        }
        Relationships: []
      }
      memoir: {
        Row: {
          created_at: string
          id: number
          meta: Json | null
          title: string | null
          type: number
          year_week: number
        }
        Insert: {
          created_at?: string
          id?: number
          meta?: Json | null
          title?: string | null
          type: number
          year_week: number
        }
        Update: {
          created_at?: string
          id?: number
          meta?: Json | null
          title?: string | null
          type?: number
          year_week?: number
        }
        Relationships: [
          {
            foreignKeyName: "memoir_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "memoir_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memoir_year_week_fkey"
            columns: ["year_week"]
            isOneToOne: false
            referencedRelation: "year_week"
            referencedColumns: ["id"]
          },
        ]
      }
      memoir_type: {
        Row: {
          created_at: string
          id: number
          name: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          value?: string
        }
        Relationships: []
      }
      user_challenge: {
        Row: {
          achieved_count: number
          certifying_shot: string | null
          challenge: number
          created_at: string
          detail: string | null
          goal_count: number | null
          id: number
          link: string | null
          week: number | null
          year: number | null
        }
        Insert: {
          achieved_count?: number
          certifying_shot?: string | null
          challenge: number
          created_at?: string
          detail?: string | null
          goal_count?: number | null
          id?: number
          link?: string | null
          week?: number | null
          year?: number | null
        }
        Update: {
          achieved_count?: number
          certifying_shot?: string | null
          challenge?: number
          created_at?: string
          detail?: string | null
          goal_count?: number | null
          id?: number
          link?: string | null
          week?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_challenge_challenge_fkey"
            columns: ["challenge"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
        ]
      }
      views: {
        Row: {
          count: number
          created_at: string
          id: number
          slug: string
        }
        Insert: {
          count?: number
          created_at?: string
          id?: number
          slug: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          slug?: string
        }
        Relationships: []
      }
      year_week: {
        Row: {
          created_at: string
          id: number
          week: number | null
          year: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          week?: number | null
          year?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          week?: number | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      best_contents: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          description: string | null
          id: number
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tag: number
          thumbnail: string | null
          title: string | null
        }[]
      }
      increment_test: {
        Args: {
          target_slug: string
        }
        Returns: undefined
      }
      increment_view: {
        Args: {
          target_slug: string
        }
        Returns: number
      }
      increment_views: {
        Args: {
          target_slug: string
        }
        Returns: number
      }
      insert_memoir: {
        Args: {
          year: number
          week: number
          column1_value: string
          column2_value: string
        }
        Returns: number
      }
      slug_test: {
        Args: {
          slug: string
        }
        Returns: string
      }
    }
    Enums: {
      banner_status: "active" | "inactive" | "expired" | "scheduled"
      banner_type: "contents" | "ad" | "other" | "community"
      content_status: "draft" | "published" | "reserved"
      contents_category:
        | "dev"
        | "frontend"
        | "backend"
        | "devops"
        | "insight"
        | "life"
        | "work"
        | "money"
        | "etc"
      quest_type: "life" | "self-learning" | "dev" | "reading" | "writing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
