class SubjectCategory < ApplicationRecord

    # DB Fields

    # title     :string
    # notes     :text
    # is_kids   :boolean
    # user_id   :integer


    # Validations

    validates   :title, presence: { message: "Ders görnüşiniň ady hökman girizilmeli..." }
    validates   :title, length: { minimum: 3, message: "Ders görnüşiniň at tarypy azyndan 3 belgiden ybarat bolmaly" }
    validates   :title, uniqueness: { message: "Ders görnüşiniň at tarypy öň gaýtalanmaýan bolmaly..."}

    #validates   :is_kids, presence: { message: "Çaga topara degişlidigi baradaky bellik hökman girizilmeli..." }


    # Associations

    belongs_to  :user    

    has_many    :subjects
end
