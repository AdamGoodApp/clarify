class BrandSerializer < ActiveModel::Serializer
  attributes :id, :email, :what_you_do, :why_you_do, :how_you_do, :target_audience, :competition_1, :proposition,
             :purpose, :personality, :market, :competition_2, :retrieval_key, :company
end