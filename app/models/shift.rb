class Shift < ApplicationRecord

    # DB Fields

    # title         :string
    # start_time    :time
    # end_time      :time
    # notes         :text
    # user_id       :integer


    # Validations

    validates   :title, presence: { message: "Seans ady hökman girizilmeli..." }
    validates   :title, length: { minimum: 3, message: "Seansyň at tarypy azyndan 3 belgiden ybarat bolmaly" }
    validates   :title, uniqueness: { message: "Seansyň at tarypy öň gaýtalanmaýan bolmaly..."}

    validates   :start_time, presence: { message: "Başlanýan senesi hökman saýlanmaly..." }

    validates   :end_time, presence: { message: "Tamamlanýan wagty hökman saýlanmaly..." }   

    # Associations

    belongs_to  :user    

    has_many    :reservations
end
