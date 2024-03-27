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
      category: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      customer: {
        Row: {
          address: string | null
          amount_spent: number | null
          business_name: string | null
          created_at: string
          dni_ruc: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          address?: string | null
          amount_spent?: number | null
          business_name?: string | null
          created_at?: string
          dni_ruc?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          address?: string | null
          amount_spent?: number | null
          business_name?: string | null
          created_at?: string
          dni_ruc?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      discounts: {
        Row: {
          concept: string | null
          created_at: string
          id: string
          name: string | null
          value: number | null
        }
        Insert: {
          concept?: string | null
          created_at?: string
          id?: string
          name?: string | null
          value?: number | null
        }
        Update: {
          concept?: string | null
          created_at?: string
          id?: string
          name?: string | null
          value?: number | null
        }
        Relationships: []
      }
      kind: {
        Row: {
          created_at: string
          description: string | null
          id: string
          id_category: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          id_category?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          id_category?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_kind_id_category_fkey"
            columns: ["id_category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          id: string
          id_kind: string | null
          image: string | null
          image_id: string | null
          price_purchase: number | null
          price_sale: number | null
          quantity: number | null
          storage_cost: number | null
          unit: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          id_kind?: string | null
          image?: string | null
          image_id?: string | null
          price_purchase?: number | null
          price_sale?: number | null
          quantity?: number | null
          storage_cost?: number | null
          unit?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          id_kind?: string | null
          image?: string | null
          image_id?: string | null
          price_purchase?: number | null
          price_sale?: number | null
          quantity?: number | null
          storage_cost?: number | null
          unit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_product_id_kind_fkey"
            columns: ["id_kind"]
            isOneToOne: false
            referencedRelation: "kind"
            referencedColumns: ["id"]
          },
        ]
      }
      product_supplier: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          id_product: string | null
          id_supplier: string | null
          quantity: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: string
          id_product?: string | null
          id_supplier?: string | null
          quantity?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          id_product?: string | null
          id_supplier?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_product_supplier_id_product_fkey"
            columns: ["id_product"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_product_supplier_id_supplier_fkey"
            columns: ["id_supplier"]
            isOneToOne: false
            referencedRelation: "supplier"
            referencedColumns: ["id"]
          },
        ]
      }
      role: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      sale: {
        Row: {
          created_at: string
          id: string
          id_customer: string | null
          id_discount: string | null
          id_user: string | null
          ticket_amount: number | null
          ticket_number: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_customer?: string | null
          id_discount?: string | null
          id_user?: string | null
          ticket_amount?: number | null
          ticket_number?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_customer?: string | null
          id_discount?: string | null
          id_user?: string | null
          ticket_amount?: number | null
          ticket_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_sale_id_customer_fkey"
            columns: ["id_customer"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sale_id_discount_fkey"
            columns: ["id_discount"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sale_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_product: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          id_product: string | null
          id_sale: string | null
          quantity: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: string
          id_product?: string | null
          id_sale?: string | null
          quantity?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          id_product?: string | null
          id_sale?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_sale_product_id_product_fkey"
            columns: ["id_product"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sale_product_id_sale_fkey"
            columns: ["id_sale"]
            isOneToOne: false
            referencedRelation: "sale"
            referencedColumns: ["id"]
          },
        ]
      }
      store: {
        Row: {
          business_name: string | null
          contact: string | null
          created_at: string
          id: string
          location: string | null
          name: string | null
          ruc: string | null
        }
        Insert: {
          business_name?: string | null
          contact?: string | null
          created_at?: string
          id?: string
          location?: string | null
          name?: string | null
          ruc?: string | null
        }
        Update: {
          business_name?: string | null
          contact?: string | null
          created_at?: string
          id?: string
          location?: string | null
          name?: string | null
          ruc?: string | null
        }
        Relationships: []
      }
      supplier: {
        Row: {
          contact: string | null
          created_at: string
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          dni: string | null
          fisrt_name: string | null
          id: string
          id_image: string | null
          id_role: string | null
          id_store: string | null
          image: string | null
          last_name: string | null
          phone_number: string | null
          shift: string | null
        }
        Insert: {
          created_at?: string
          dni?: string | null
          fisrt_name?: string | null
          id?: string
          id_image?: string | null
          id_role?: string | null
          id_store?: string | null
          image?: string | null
          last_name?: string | null
          phone_number?: string | null
          shift?: string | null
        }
        Update: {
          created_at?: string
          dni?: string | null
          fisrt_name?: string | null
          id?: string
          id_image?: string | null
          id_role?: string | null
          id_store?: string | null
          image?: string | null
          last_name?: string | null
          phone_number?: string | null
          shift?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_id_role_fkey"
            columns: ["id_role"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_id_store_fkey"
            columns: ["id_store"]
            isOneToOne: false
            referencedRelation: "store"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
