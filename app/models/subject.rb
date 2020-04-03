class Subject < ApplicationRecord

  # DB Fields

  # title                 :string
  # level                 :integer
  # notes                 :text
  # subject_category_id   :integer (references 'subject_category' model)
  # language_id           :integer (references 'language' model)
  # user_id               :integer



  # Validations

  validates   :title,               
              length: { minimum: 3 }, 
              presence: true,
              message: "Dersiň ady hökman girizilmeli we azyndan 3 belgi uzynlykda bolmaly..."

  validates   :level,               
              numericality: { only_integer: true}, 
              presence: true,
              message: "Ders derejesi hökman girizilmeli..."

  validates   :subject_category_id, 
              presence: true,
              message: "Ders görnüşi topary hökman saýlanylmaly..."

  validates   :language_id,         
              presence: true,
              message: "Diliň ady hökman saýlanylmaly..."

  # Associations

  belongs_to :user
  belongs_to :subject_category
  belongs_to :language

  has_many :reservations
  has_many :subject_tests
end
