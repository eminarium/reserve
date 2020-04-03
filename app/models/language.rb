class Language < ApplicationRecord

    # DB Fields

    # title     :string
    # notes     :text
    # user_id   :integer

    # Validations

    validates   :title, presence: { message: "Diliň at tarypy hökman girizilmeli..." }
    validates   :title, length: { minimum: 2, message: "Diliň at tarypy azyndan 2 belgiden ybarat bolmaly..." }
    validates   :title, uniqueness: { message: "Diliň at tarypy öň ulanylmadyk söz bolmaly ..." }


    # Associations

    belongs_to  :user

    has_many    :subjects
end
