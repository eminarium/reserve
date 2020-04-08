class Season < ApplicationRecord

    # DB Fields

    # title             :string
    # order_no          :integer
    # start_date        :date
    # end_date          :date
    # return_deadline   :date
    # notes             :text
    # user_id           :integer
    

    # Validations

    validates   :title, presence: { message: "Tapgyr ady hökman girizilmeli..." }
    validates   :title, length: { minimum: 3, message: "Tapgyryň at tarypy azyndan 3 belgiden ybarat bolmaly" }
    validates   :title, uniqueness: { message: "Tapgyryň at tarypy öň gaýtalanmaýan bolmaly..."}

    validates   :start_date, presence: { message: "Başlanýan senesi hökman saýlanmaly..." }

    validates   :end_date, presence: { message: "Tamamlanýan senesi hökman saýlanmaly..." }   
    
    validates   :return_deadline, presence: { message: "Töleg gaýtarma möhleti hökman girizilmeli..." }   

    validates   :order_no, presence: { message: "Tapgyr tertip belgisi hökman girizilmeli..." }
    validates   :order_no, uniqueness: { message: "Tapgyryň tertip belgisi öň gaýtalanmaýan bolmaly..."}
    validates   :order_no, numericality: { only_integer: true, message: "Tapgyryň tertip belgisi hökman san bolmaly..."}

    
    # Associations

    belongs_to  :user

    has_many    :reservations
    has_many    :subject_tests
end
