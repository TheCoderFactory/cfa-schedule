json.array!(@intakes) do |intake|
  json.extract! intake, :id, :name, :term_one_start, :term_one_end, :term_two_start, :term_two_end, :term_three_start, :term_three_end, :term_four_start, :term_four_end, :color
  json.url intake_url(intake, format: :json)
end
