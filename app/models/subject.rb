class Subject < ApplicationRecord

  # DB Fields

  # title                 :string
  # level                 :integer
  # notes                 :text
  # subject_category_id   :integer (references 'subject_category' model)
  # language_id           :integer (references 'language' model)
  # passing_points        :float
  # user_id               :integer



  # Validations

  validates   :title, presence: { message: "Dersiň ady hökman girizilmeli..." }
  validates   :title, length: { minimum: 3, message: "Dersiň ady azyndan 2 belgiden ybarat bolmaly..." }

  validates   :passing_points, presence: { message: "Geçiş bahasy hökman girizilmeli..." }
  validates   :passing_points, numericality: { greater_than_or_equal_to: 0, message: "Geçiş bahasy 0 ýa-da ondan ýokary bolmaly..." }


  validates   :level, presence: { message: "Dersiň derejesi hökman girizilmeli..." }
  validates   :level, numericality: { only_integer: true, message: "Dersiň derejesi diňe san bolmaly..." }

  validates   :subject_category_id, presence: { message: "Dersiň görnüşi hökman saýlanylmaly..." }

  validates   :subject_category_id, presence: { message: "Diliň ady hökman saýlanylmaly..." }


  # Associations

  belongs_to :user
  belongs_to :subject_category
  belongs_to :language

  has_many :reservations
  has_many :subject_tests
end
