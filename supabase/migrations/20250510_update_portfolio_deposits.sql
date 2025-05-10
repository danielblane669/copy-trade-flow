
-- Create functions to update portfolio values
CREATE OR REPLACE FUNCTION public.update_user_portfolio_deposits(user_id_param UUID, deposit_amount NUMERIC)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_portfolios 
  SET 
    deposits = COALESCE(deposits, 0) + deposit_amount,
    portfolio_value = COALESCE(portfolio_value, 0) + deposit_amount,
    updated_at = now()
  WHERE user_id = user_id_param;
END;
$$;

-- Helper function to add amount to deposits column
CREATE OR REPLACE FUNCTION public.add_to_deposits(amount NUMERIC)
RETURNS NUMERIC
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE($1, 0) + COALESCE(amount, 0)
$$;

-- Helper function to add amount to portfolio value
CREATE OR REPLACE FUNCTION public.add_to_portfolio_value(amount NUMERIC)
RETURNS NUMERIC
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE($1, 0) + COALESCE(amount, 0)
$$;
