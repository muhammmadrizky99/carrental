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
      bookings: {
        Row: {
          car_id: number | null
          created_at: string
          id: number
          pickupDate: string | null
          provider_id: string | null
          returnDate: string | null
          status: string | null
          totalPrice: number | null
          user_id: string | null
        }
        Insert: {
          car_id?: number | null
          created_at?: string
          id?: number
          pickupDate?: string | null
          provider_id?: string | null
          returnDate?: string | null
          status?: string | null
          totalPrice?: number | null
          user_id?: string | null
        }
        Update: {
          car_id?: number | null
          created_at?: string
          id?: number
          pickupDate?: string | null
          provider_id?: string | null
          returnDate?: string | null
          status?: string | null
          totalPrice?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          acAvailable: boolean | null
          acWorking: boolean | null
          color: string | null
          country_id: number | null
          created_at: string
          description: string | null
          engineCapacity: string | null
          fuelType: string | null
          id: number
          images: string[] | null
          make: string | null
          maximumRentalPeriodInDays: number | null
          minimumRentalPeriodInDays: number | null
          model: string | null
          numberOfBags: number | null
          numberOfDoors: number | null
          otherFeatures: string[] | null
          pricePerDay: number | null
          provider_id: string | null
          region_id: number | null
          seatingCapacity: number | null
          slug: string | null
          status: string | null
          transmission: string | null
          type: string | null
          year: number | null
        }
        Insert: {
          acAvailable?: boolean | null
          acWorking?: boolean | null
          color?: string | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          engineCapacity?: string | null
          fuelType?: string | null
          id?: number
          images?: string[] | null
          make?: string | null
          maximumRentalPeriodInDays?: number | null
          minimumRentalPeriodInDays?: number | null
          model?: string | null
          numberOfBags?: number | null
          numberOfDoors?: number | null
          otherFeatures?: string[] | null
          pricePerDay?: number | null
          provider_id?: string | null
          region_id?: number | null
          seatingCapacity?: number | null
          slug?: string | null
          status?: string | null
          transmission?: string | null
          type?: string | null
          year?: number | null
        }
        Update: {
          acAvailable?: boolean | null
          acWorking?: boolean | null
          color?: string | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          engineCapacity?: string | null
          fuelType?: string | null
          id?: number
          images?: string[] | null
          make?: string | null
          maximumRentalPeriodInDays?: number | null
          minimumRentalPeriodInDays?: number | null
          model?: string | null
          numberOfBags?: number | null
          numberOfDoors?: number | null
          otherFeatures?: string[] | null
          pricePerDay?: number | null
          provider_id?: string | null
          region_id?: number | null
          seatingCapacity?: number | null
          slug?: string | null
          status?: string | null
          transmission?: string | null
          type?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cars_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cars_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cars_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
        }
        Relationships: []
      }
      providers: {
        Row: {
          avatar: string | null
          businessRegistrationNumber: string | null
          city: string | null
          companyName: string | null
          contactName: string | null
          country_id: number | null
          created_at: string
          email: string | null
          id: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          region_id: number | null
          street: string | null
        }
        Insert: {
          avatar?: string | null
          businessRegistrationNumber?: string | null
          city?: string | null
          companyName?: string | null
          contactName?: string | null
          country_id?: number | null
          created_at?: string
          email?: string | null
          id: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          region_id?: number | null
          street?: string | null
        }
        Update: {
          avatar?: string | null
          businessRegistrationNumber?: string | null
          city?: string | null
          companyName?: string | null
          contactName?: string | null
          country_id?: number | null
          created_at?: string
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          region_id?: number | null
          street?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "providers_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "providers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "providers_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          country_id: number | null
          created_at: string
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
        }
        Insert: {
          country_id?: number | null
          created_at?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
        }
        Update: {
          country_id?: number | null
          created_at?: string
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          car_id: number | null
          comment: string | null
          created_at: string
          dislikes: number | null
          id: number
          likes: number | null
          provider_id: string | null
          rate: number | null
          user_id: string | null
        }
        Insert: {
          car_id?: number | null
          comment?: string | null
          created_at?: string
          dislikes?: number | null
          id?: number
          likes?: number | null
          provider_id?: string | null
          rate?: number | null
          user_id?: string | null
        }
        Update: {
          car_id?: number | null
          comment?: string | null
          created_at?: string
          dislikes?: number | null
          id?: number
          likes?: number | null
          provider_id?: string | null
          rate?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          city: string | null
          country_id: number | null
          created_at: string
          dateOfBirth: string | null
          email: string | null
          firstName: string | null
          gender: string | null
          id: string
          lastName: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          region_id: number | null
          street: string | null
        }
        Insert: {
          avatar?: string | null
          city?: string | null
          country_id?: number | null
          created_at?: string
          dateOfBirth?: string | null
          email?: string | null
          firstName?: string | null
          gender?: string | null
          id: string
          lastName?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          region_id?: number | null
          street?: string | null
        }
        Update: {
          avatar?: string | null
          city?: string | null
          country_id?: number | null
          created_at?: string
          dateOfBirth?: string | null
          email?: string | null
          firstName?: string | null
          gender?: string | null
          id?: string
          lastName?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          region_id?: number | null
          street?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
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